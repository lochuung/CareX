package org.webdev.carex.dto.request.workshop;

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
    private String name;
    private String description;
    private String address;
    private String imageUrl;
    private String hostName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
