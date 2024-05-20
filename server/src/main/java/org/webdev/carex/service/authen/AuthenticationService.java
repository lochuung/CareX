package org.webdev.carex.service.authen;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.webdev.carex.constant.AppConstants;
import org.webdev.carex.constant.SecurityConstants;
import org.webdev.carex.dto.auth.AuthenticationRequest;
import org.webdev.carex.dto.auth.AuthenticationResponse;
import org.webdev.carex.dto.auth.RegisterRequest;
import org.webdev.carex.dto.auth.VerifyRequest;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.VerifyCode;
import org.webdev.carex.exception.BadRequestException;
import org.webdev.carex.exception.UnauthorizedException;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.repository.VerifyCodeRepository;
import org.webdev.carex.service.EmailService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static org.webdev.carex.constant.AppConstants.VERIFY_CODE_LENGTH;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerifyCodeRepository verifyCodeRepository;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailService emailService;

    @Transactional
    public ResponseDto<Object> register(RegisterRequest request) throws MessagingException {
        if (!StringUtils.hasText(request.getEmail())) {
            throw BadRequestException.message("Email is required.");
        }

        if (!StringUtils.hasText(request.getPassword())) {
            throw BadRequestException.message("Password is required.");
        }

        if (!StringUtils.hasText(request.getFullName())) {
            throw BadRequestException.message("Full name is required.");
        }

        if (request.getBirthday() == null) {
            throw BadRequestException.message("Birthday is required.");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw BadRequestException.message("Password and confirm password do not match.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw BadRequestException.message("Email is already taken: "
                    + request.getEmail());
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .birthday(request.getBirthday())
                .build();
        var savedUser = userRepository.save(user);
        Date expired = DateUtils.addMinutes(new Date(),
                AppConstants.VERIFY_CODE_EXPIRATION);
        LocalDateTime expiredAt = LocalDateTime.ofInstant(expired.toInstant(),
                ZoneId.systemDefault());

        var verifyCode = VerifyCode.builder()
                        .user(savedUser)
                        .code(generateVerifyCode())
                        .expiredAt(expiredAt)
                        .build();
        verifyCodeRepository.save(verifyCode);

        emailService.sendVerifyCode(savedUser.getEmail(), verifyCode.getCode());

        return ResponseDto.success(null);
    }

    private String generateVerifyCode() {
        String codeBase = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        for (int i = 0; i < VERIFY_CODE_LENGTH; i++) {
            int index = (int) (codeBase.length() * Math.random());
            codeBuilder.append(codeBase.charAt(index));
        }
        return codeBuilder.toString();
    }

    public ResponseDto<Object> verify(VerifyRequest request) {
        var email = request.getEmail();
        var code = request.getCode();

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> BadRequestException.message("User is invalid."));

        var verifyCode = verifyCodeRepository.findByUserAndCode(user, code)
                .orElseThrow(() -> BadRequestException.message("Verify code is invalid."));

        if (verifyCode.isUsed()) {
            throw BadRequestException.message("Verify code is already used.");
        }

        if (verifyCode.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw BadRequestException.message("Verify code is expired.");
        }
        verifyCode.setUsed(true);
        verifyCodeRepository.save(verifyCode);
        return ResponseDto.success(null);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(),
                            request.getPassword())
            );
        } catch (Exception e) {
            throw BadRequestException.message("Invalid email or password.");
        }

        UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());
        if (user == null) {
            throw BadRequestException.message("Can not find user: " + request.getEmail());
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder().accessToken(jwtToken).refreshToken(refreshToken).build();
    }

    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith(SecurityConstants.BEARER)) {
            throw new UnauthorizedException();
        }
        final String refreshToken = authHeader.substring(SecurityConstants.BEARER.length());
        final String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            UserDetails user = userDetailsService.loadUserByUsername(userEmail);
            if (user == null) {
                throw BadRequestException.message("Can not find user: " + userEmail);
            }
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
//                revokeAllUserTokens(user);
//                saveUserToken(user, accessToken);
                return AuthenticationResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
            }
        }
        throw new UnauthorizedException();
    }

}
