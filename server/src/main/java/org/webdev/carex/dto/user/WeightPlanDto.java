package org.webdev.carex.dto.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeightPlanDto {
    @NotNull(message = "Weight plan id is required")
    private Long id;
    private String name;
    private String description;
}
