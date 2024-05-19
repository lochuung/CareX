package org.webdev.carex.controller.api;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.auth.AuthenticationRequest;
import org.webdev.carex.dto.auth.RegisterRequest;
import org.webdev.carex.dto.auth.VerifyRequest;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.service.authen.AuthenticationService;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody RegisterRequest request
    ) throws MessagingException {
        return ResponseEntity.ok(
                ResponseDto.success(service.register(request))
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<Object> verify(
            @RequestBody VerifyRequest request
    ) {
        return ResponseEntity.ok(
                ResponseDto.success(service.verify(request))
        );
    }

    @PostMapping("/login")
    public ResponseEntity<Object> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(
                ResponseDto.success(service.authenticate(request))
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return ResponseEntity.ok(
                service.refreshToken(request, response)
        );
    }
}
