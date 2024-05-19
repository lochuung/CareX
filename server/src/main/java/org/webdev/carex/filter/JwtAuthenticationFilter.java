package org.webdev.carex.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.webdev.carex.constant.SecurityConstants;
import org.webdev.carex.dto.ErrorDto;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.service.authen.JwtService;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.List;

import static org.webdev.carex.constant.SecurityConstants.AUTHORIZATION;

@Slf4j
@AllArgsConstructor
@Builder
public class JwtAuthenticationFilter extends OncePerRequestFilter
    implements AuthenticationEntryPoint {
    private JwtService jwtService;

    private UserDetailsService userDetailService;

    private ObjectMapper objectMapper;

    @Value("#{'${security.ignore.paths}'.split(',')}")
    private List<String> ignoreList;

    @Value("${app.security.enabled:true}")
    private boolean isSecuredMode;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if(!isSecuredMode) {
            filterChain.doFilter(request, response);
            return;
        }
        if (ignoreList.stream().anyMatch(s -> request.getServletPath().contains(s))) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Lấy jwt từ request
            String jwt = getJwtFromRequest(request);

            if (!StringUtils.hasText(jwt) && !jwtService.validateToken(jwt)) {
                unAuthorizedResponse(response);
                return;
            }

            String userEmail = jwtService.extractUsername(jwt);
            UserDetails userDetails;
            try {
                userDetails = userDetailService.loadUserByUsername(userEmail);
            } catch (UsernameNotFoundException e) {
                unAuthorizedResponse(response);
                return;
            }
            if (userDetails == null) {
                unAuthorizedResponse(response);
                return;
            }
            // Nếu người dùng hợp lệ, set thông tin cho Seturity Context
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            log.error(e.getMessage());
            unAuthorizedResponse(response);
            return;
        }
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION);
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(SecurityConstants.BEARER)) {
            return bearerToken.substring(SecurityConstants.BEARER.length());
        }
        return null;
    }

    private void unAuthorizedResponse(HttpServletResponse response) throws IOException {
        var error = ErrorDto.builder()
                .message(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .timestamp(LocalDateTime.now())
                .build();
        var errResponse = ResponseDto
                .error(error, HttpStatus.UNAUTHORIZED.value());

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        PrintWriter writer = response.getWriter();
        writer.write(objectMapper.writeValueAsString(errResponse));
        writer.flush();
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException,
            ServletException {
        ErrorDto error = ErrorDto.builder()
                .message(authException.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        ResponseDto<Object> re = ResponseDto.builder()
                .error(error)
                .build();

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        OutputStream responseStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(responseStream, re);
        responseStream.flush();
    }
}