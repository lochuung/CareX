package org.webdev.carex.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDto {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
