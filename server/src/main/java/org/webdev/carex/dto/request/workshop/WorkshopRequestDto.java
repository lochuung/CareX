package org.webdev.carex.dto.request.workshop;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkshopRequestDto{
    @NotBlank(message = "Name is required")
    private String name;
    private String description;
    @NotNull(message = "Address is required")
    private String address;
    private String imageUrl;
    @NotNull(message = "Category is required")
    private String category;
    @NotNull(message = "Start time is required")
    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime startTime;
    @NotNull(message = "End time is required")
    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime endTime;
}
