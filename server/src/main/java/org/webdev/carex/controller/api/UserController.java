package org.webdev.carex.controller.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.user.ChangePasswordDto;
import org.webdev.carex.dto.user.UserRequest;
import org.webdev.carex.dto.user.UserResponse;
import org.webdev.carex.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseDto<UserResponse> getUserInfo(Authentication authentication) {
        return ResponseDto.success(
                userService.findByEmail(authentication.getName())
        );
    }

    @PostMapping("/update")
    public ResponseDto<UserResponse> updateUserInfo(@RequestBody UserRequest userRequest,
                                                    Authentication authentication) {
        userRequest.setEmail(authentication.getName());
        return ResponseDto.success(
                userService.update(userRequest)
        );
    }

    @PostMapping("/update-password")
    public ResponseDto<UserResponse> updatePassword(@RequestBody ChangePasswordDto changePasswordDto,
                                                    Authentication authentication) {
        return ResponseDto.success(
                userService.updatePassword(authentication.getName(), changePasswordDto)
        );
    }

    @PostMapping("/enable")
    public ResponseDto<Object> enableUser(Authentication authentication) throws MessagingException {
        return ResponseDto.success(
                userService.enableUser(authentication.getName())
        );
    }
}
