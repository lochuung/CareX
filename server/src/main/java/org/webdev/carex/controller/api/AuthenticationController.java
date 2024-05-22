package org.webdev.carex.controller.api;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.auth.AuthenticationRequest;
import org.webdev.carex.dto.auth.AuthenticationResponse;
import org.webdev.carex.dto.auth.RegisterRequest;
import org.webdev.carex.dto.auth.VerifyRequest;
import org.webdev.carex.dto.ResponseDto;
<<<<<<< HEAD
import org.webdev.carex.dto.response.post.PostResponseDto;
import org.webdev.carex.service.PostService;
import org.webdev.carex.service.authen.AuthenticationService;

import java.io.IOException;
import java.util.List;
=======
import org.webdev.carex.service.authen.AuthenticationService;

import java.io.IOException;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto<Object>> register(
            @RequestBody RegisterRequest request
    ) throws MessagingException {
        return ResponseEntity.ok(
                service.register(request)
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<ResponseDto<Object>> verify(
            @RequestBody VerifyRequest request
    ) {
        return ResponseEntity.ok(
                service.verify(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<AuthenticationResponse>> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(
                ResponseDto.success(service.authenticate(request))
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ResponseDto<AuthenticationResponse>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return ResponseEntity.ok(
                ResponseDto.success(service.refreshToken(request, response))
        );
    }
}
