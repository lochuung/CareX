package org.webdev.carex.dto.yoga;

import lombok.*;
<<<<<<< HEAD
=======
import lombok.experimental.SuperBuilder;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895

import java.time.LocalDateTime;

@Data
<<<<<<< HEAD
@Builder
=======
@SuperBuilder
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutHistoryDto {
    private Long id;
    private YogaDto yogaWorkout;
    private LocalDateTime startTime;
    private boolean isDone;
}
