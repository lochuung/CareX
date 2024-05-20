package org.webdev.carex.service;

import org.webdev.carex.dto.yoga.WorkoutHistoryDto;
import org.webdev.carex.dto.yoga.YogaDto;

import java.util.List;

public interface YogaService {
    YogaDto upsert(YogaDto yogaDto);

    void delete(Long id);

    YogaDto findById(Long id);

    List<YogaDto> findAll();

    List<WorkoutHistoryDto> getWorkoutHistoryFromEmail(String name);

    WorkoutHistoryDto upsertWorkoutHistory(WorkoutHistoryDto workoutHistoryDto, String email);

    void createData();
}
