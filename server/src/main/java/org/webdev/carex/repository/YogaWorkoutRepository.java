package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.YogaWorkout;

public interface YogaWorkoutRepository extends JpaRepository<YogaWorkout, Long> {
}
