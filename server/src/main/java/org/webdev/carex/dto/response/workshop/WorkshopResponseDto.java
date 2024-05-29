package org.webdev.carex.dto.response.workshop;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkshopResponseDto {
    private Long id;
    private String hostName;
    private String name;
    private String description;
    private String address;
    private String imageUrl;
    private String category;
    private int totalPeople;
    List<UserJoinResponse> userJoins;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isCancelled;
    private boolean isFinished;
}
