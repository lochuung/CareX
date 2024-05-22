package org.webdev.carex.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.webdev.carex.entity.common.BaseEntity;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "yoga_workouts")
public class YogaWorkout extends BaseEntity {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private String videoUrl;

    private Integer level;

    private Double point;

    private Integer duration; //second

<<<<<<< HEAD
=======
    private String instruction;

>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
    @OneToMany(mappedBy = "yogaWorkout", fetch = jakarta.persistence.FetchType.LAZY)
    private List<WorkoutHistory> workoutHistories;
}
