package org.webdev.carex.service;

<<<<<<< HEAD
import org.webdev.carex.dto.yoga.WorkoutHistoryDto;
import org.webdev.carex.dto.yoga.YogaDto;

=======
import com.opencsv.exceptions.CsvException;
import org.webdev.carex.dto.yoga.WorkoutHistoryDto;
import org.webdev.carex.dto.yoga.YogaDto;

import java.io.IOException;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
import java.util.List;

public interface YogaService {
    YogaDto upsert(YogaDto yogaDto);

    void delete(Long id);

    YogaDto findById(Long id);

    List<YogaDto> findAll();

    List<WorkoutHistoryDto> getWorkoutHistoryFromEmail(String name);

    WorkoutHistoryDto upsertWorkoutHistory(WorkoutHistoryDto workoutHistoryDto, String email);

<<<<<<< HEAD
    void createData();
=======
    void createData() throws IOException, CsvException;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
}
