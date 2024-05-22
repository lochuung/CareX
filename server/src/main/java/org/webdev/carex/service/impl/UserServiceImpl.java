package org.webdev.carex.service.impl;

<<<<<<< HEAD
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webdev.carex.entity.Privilege;
import org.webdev.carex.entity.Role;
import org.webdev.carex.entity.User;
import org.webdev.carex.repository.PrivilegeRepository;
import org.webdev.carex.repository.RoleRepository;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.service.UserService;

import java.util.List;

@Service
@AllArgsConstructor
=======
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.webdev.carex.constant.AppConstants;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.mapper.UserMapper;
import org.webdev.carex.dto.user.ChangePasswordDto;
import org.webdev.carex.dto.user.UserRequest;
import org.webdev.carex.dto.user.UserResponse;
import org.webdev.carex.entity.Privilege;
import org.webdev.carex.entity.Role;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.VerifyCode;
import org.webdev.carex.exception.BadRequestException;
import org.webdev.carex.repository.PrivilegeRepository;
import org.webdev.carex.repository.RoleRepository;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.repository.VerifyCodeRepository;
import org.webdev.carex.service.EmailService;
import org.webdev.carex.service.UserService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.webdev.carex.utils.AuthUtils.SendVerifyCodeHandle;
import static org.webdev.carex.utils.AuthUtils.generateVerifyCode;

@Service
@RequiredArgsConstructor
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;
<<<<<<< HEAD
=======
    private final VerifyCodeRepository verifyCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public UserResponse update(UserRequest userRequest) {
        User user = userRepository.findByEmail(userRequest.getEmail())
                .orElseThrow(() ->
                        BadRequestException.message("User not found."));

        user.setFullName(userRequest.getFullName());
        user.setBirthday(userRequest.getBirthday());
        if (userRequest.getHealthyInfo() != null)
            user.setHealthyInfo(UserMapper.INSTANCE.toEntity(userRequest.getHealthyInfo()));
        user.setUpdatedDate(LocalDateTime.now());

        userRepository.save(user);
        return UserMapper.INSTANCE.toDto(user);
    }

    @Override
    public UserResponse updatePassword(String email, ChangePasswordDto changePasswordDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        BadRequestException.message("User not found."));

        if (!StringUtils.hasText(changePasswordDto.getOldPassword()) ||
                !StringUtils.hasText(changePasswordDto.getNewPassword()) ||
                !StringUtils.hasText(changePasswordDto.getConfirmPassword())) {
            throw BadRequestException.message("Old password, new password, and confirm password are required.");
        }

        if (!changePasswordDto.getNewPassword().equals(changePasswordDto.getConfirmPassword())) {
            throw BadRequestException.message("New password and confirm password do not match.");
        }

        if (!passwordEncoder.matches(changePasswordDto.getOldPassword(),
                user.getPassword().replace("{bcrypt}", ""))) {
            throw BadRequestException.message("Old password is incorrect.");
        }

        user.setPassword("{bcrypt}" + passwordEncoder
                .encode(changePasswordDto.getNewPassword()));
        user.setUpdatedDate(LocalDateTime.now());

        userRepository.save(user);
        return UserMapper.INSTANCE.toDto(user);
    }

    @Override
    public UserResponse findByEmail(String email) {
        return UserMapper.INSTANCE.toDto(userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        BadRequestException.message("User not found."))
        );
    }

    @Override
    public Map<String, String> enableUser(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        BadRequestException.message("User not found."));

        if (user.isEnabled()) {
            return Map.of("message", "User is already enabled.");
        }

        SendVerifyCodeHandle(user, emailService, verifyCodeRepository);

        return Map.of("message", "Code has been sent to your email.");
    }
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895

    @Transactional
    @Override
    public void createData() {
        if (userRepository.count() > 0) {
            return;
        }

        Privilege readPrivilege = Privilege.builder().name("READ").build();
        Privilege writePrivilege = Privilege.builder().name("WRITE").build();
        Privilege deletePrivilege = Privilege.builder().name("DELETE").build();
        Privilege createWorkshopPrivilege = Privilege.builder().name("CREATE_WORKSHOP").build();

        if (privilegeRepository.count() == 0) {
            privilegeRepository.saveAll(List.of(
                    readPrivilege,
                    writePrivilege,
                    deletePrivilege,
                    createWorkshopPrivilege
            ));
        }
        if (roleRepository.count() == 0) {
            roleRepository.saveAll(List.of(
                    Role.builder()
                            .name("USER")
                            .privileges(List.of(
                                    readPrivilege,
                                    writePrivilege
                            ))
                            .build(),
                    Role.builder()
                            .name("ADMIN")
                            .privileges(List.of(
                                    readPrivilege,
                                    writePrivilege,
                                    deletePrivilege,
                                    createWorkshopPrivilege
                            ))
                            .build()
            ));
        }

        userRepository.save(User.builder()
                .email("admin@huuloc.id.vn")
                .password("{bcrypt}" + new BCryptPasswordEncoder(10)
                        .encode("admin"))
                .fullName("Admin")
                .enabled(true)
                .roles(List.of(roleRepository.findByName("ADMIN")))
                .build());
<<<<<<< HEAD
=======

        userRepository.save(User.builder()
                .email("locn562836@gmail.com")
                .password("{bcrypt}" + new BCryptPasswordEncoder(10)
                        .encode("user"))
                .fullName("User")
                .enabled(true)
                .roles(List.of(roleRepository.findByName("USER")))
                .build());
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
    }
}
