package org.webdev.carex.dto.response.workshop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserJoinResponse {
    private String fullName;
    private LocalDate birthDay;
    private BigDecimal point;
}
