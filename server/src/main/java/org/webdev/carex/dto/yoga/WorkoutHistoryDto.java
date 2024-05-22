package org.webdev.carex.dto.yoga;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutHistoryDto {
    private Long id;
    private YogaDto yogaWorkout;
    private LocalDateTime startTime;
    private boolean isDone;
}
