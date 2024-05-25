package org.webdev.carex.dto.user;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDto {
    @NotNull(message = "Old password is required")
    private String oldPassword;
    @NotNull(message = "New password is required")
    private String newPassword;
    @NotNull(message = "Confirm password is required")
    private String confirmPassword;
}
