package org.webdev.carex.dto.yoga;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutHistoryDto {
    private Long id;
    private YogaDto yogaWorkout;
    private LocalDateTime startTime;
    private boolean isDone;
}
