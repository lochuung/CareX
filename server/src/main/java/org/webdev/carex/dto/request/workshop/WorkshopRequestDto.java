package org.webdev.carex.dto.request.workshop;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkshopRequestDto{
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String address;
    @NotBlank
    private String imageUrl;
    @NotBlank
    private String category;
    @NotBlank
    private LocalDateTime startTime;
    @NotBlank
    private LocalDateTime endTime;
}
