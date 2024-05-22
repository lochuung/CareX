package org.webdev.carex.service.impl;

<<<<<<< HEAD
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
=======
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
import org.springframework.stereotype.Service;
import org.webdev.carex.dto.mapper.YogaHistoryMapper;
import org.webdev.carex.dto.mapper.YogaMapper;
import org.webdev.carex.dto.yoga.WorkoutHistoryDto;
import org.webdev.carex.dto.yoga.YogaDto;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.WorkoutHistory;
import org.webdev.carex.entity.YogaWorkout;
import org.webdev.carex.exception.BadRequestException;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.repository.WorkoutHistoryRepository;
import org.webdev.carex.repository.YogaWorkoutRepository;
import org.webdev.carex.service.YogaService;

<<<<<<< HEAD
=======
import java.io.IOException;
import java.io.InputStreamReader;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class YogaServiceImpl implements YogaService {
    private final YogaWorkoutRepository yogaRepository;
    private final WorkoutHistoryRepository historyRepository;
    private final UserRepository userRepository;

    @Override
    public YogaDto upsert(YogaDto yogaDto) {
<<<<<<< HEAD
//        Authentication authentication = SecurityContextHolder
//                .getContext().getAuthentication();
//        if (authentication == null) {
//            throw BadRequestException.message("User not authenticated");
//        }
//        if (authentication.getAuthorities().stream()
//                .noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
//            throw BadRequestException.message("User not authorized");
//        }
=======
        Authentication authentication = SecurityContextHolder
                .getContext().getAuthentication();
        if (authentication == null) {
            throw BadRequestException.message("User not authenticated");
        }
        if (authentication.getAuthorities().stream()
                .noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw BadRequestException.message("User not authorized");
        }

>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
        if (yogaDto == null) {
            throw BadRequestException.message("Yoga workout cannot be null");
        }
        if (yogaDto.getId() != null && yogaDto.getId() <= 0) {
            yogaDto.setId(null);
        }
        YogaWorkout yoga = YogaMapper.INSTANCE.toYoga(yogaDto);
        yoga = yogaRepository.save(yoga);
        return YogaMapper.INSTANCE.toYogaDto(yoga);
    }

    @Override
    public void delete(Long id) {
        if (!yogaRepository.existsById(id)) {
            throw BadRequestException.message("Yoga workout not found");
        }
        yogaRepository.deleteById(id);
    }

    @Override
    public YogaDto findById(Long id) {
        return yogaRepository.findById(id)
                .map(YogaMapper.INSTANCE::toYogaDto)
                .orElseThrow(() -> BadRequestException.message("Yoga workout not found"));
    }

    @Override
    public List<YogaDto> findAll() {
        return YogaMapper.INSTANCE.toYogaDtoList(yogaRepository.findAll());
    }

    @Override
    public List<WorkoutHistoryDto> getWorkoutHistoryFromEmail(String email) {
        List<WorkoutHistory> history
                = historyRepository.findByUserEmail(email);
        return YogaHistoryMapper.INSTANCE
                .toYogaHistoryDtoList(history);
    }

    @Override
    @Transactional
    public WorkoutHistoryDto upsertWorkoutHistory(WorkoutHistoryDto workoutHistoryDto, String email) {
        WorkoutHistory history = YogaHistoryMapper.INSTANCE.toYogaHistory(workoutHistoryDto);
        if (history == null) {
            throw BadRequestException.message("Workout history cannot be null");
        }
        if (!yogaRepository.existsById(history.getYogaWorkout().getId())) {
            throw BadRequestException.message("Yoga workout not found");
        }
        if (history.getStartTime() == null) {
            history.setStartTime(LocalDateTime.now());
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> BadRequestException.message("User not found"));
        history.setUser(user);
        YogaWorkout workout = yogaRepository.findById(history.getYogaWorkout().getId())
                .orElseThrow(() -> BadRequestException.message("Yoga workout not found"));
        history.setYogaWorkout(workout);

        // insert
        if (history.getId() <= 0) {
            history = historyRepository.save(history);
            return YogaHistoryMapper.INSTANCE.toYogaHistoryDto(history);
        }

        // update
        WorkoutHistory oldHistory = historyRepository.findById(history.getId())
                .orElseThrow(() -> BadRequestException.message("Workout history not found"));
        if (!Objects.equals(oldHistory.getUser().getId(), user.getId())) {
            throw BadRequestException.message("User not authorized");
        }
        if (!Objects.equals(oldHistory.getYogaWorkout().getId(),
                history.getYogaWorkout().getId())) {
            throw BadRequestException.message("Yoga workout cannot be changed");
        }

        oldHistory.setStartTime(history.getStartTime());
        oldHistory.setDone(history.isDone());
        oldHistory = historyRepository.save(oldHistory);
        return YogaHistoryMapper.INSTANCE.toYogaHistoryDto(oldHistory);
    }

    @Override
<<<<<<< HEAD
    public void createData() {
        if (yogaRepository.count() > 0) {
            return;
        }
        YogaWorkout yoga = YogaWorkout.builder()
                .name("Yoga 1")
                .description("Yoga workout 1")
                .imageUrl("https://images.ctfassets.net/6ilvqec50fal/9dGv5WEjz4WCmqNT4ohK7/6f4751715ae7e71f466b4610404eaabf/How_to_create_a_yoga_focused_routine.jpg")
                .videoUrl("https://www.youtube.com/watch?v=NJU8dcCacRY")
                .level(1)
                .point(10.0)
                .duration(1800)
                .build();
        yogaRepository.save(yoga);

        yoga = YogaWorkout.builder()
                .name("Yoga 2")
                .description("Yoga workout 2")
                .imageUrl("https://images.ctfassets.net/6ilvqec50fal/9dGv5WEjz4WCmqNT4ohK7/6f4751715ae7e71f466b4610404eaabf/How_to_create_a_yoga_focused_routine.jpg")
                .videoUrl("https://www.youtube.com/watch?v=NJU8dcCacRY")
                .level(2)
                .point(20.0)
                .duration(2800)
                .build();
        yogaRepository.save(yoga);

        yoga = YogaWorkout.builder()
                .name("Yoga 3")
                .description("Yoga workout 3")
                .imageUrl("https://images.ctfassets.net/6ilvqec50fal/9dGv5WEjz4WCmqNT4ohK7/6f4751715ae7e71f466b4610404eaabf/How_to_create_a_yoga_focused_routine.jpg")
                .videoUrl("https://www.youtube.com/watch?v=NJU8dcCacRY")
                .level(3)
                .point(30.0)
                .duration(3800)
                .build();
        yogaRepository.save(yoga);
=======
    public void createData() throws IOException, CsvException {
        if (yogaRepository.count() > 0) {
            return;
        }
        // read csv file in classpath csv/yoga-raw.csv and insert to database
        try (CSVReader reader = new CSVReader(
                new InputStreamReader(Objects.requireNonNull(
                        getClass().getClassLoader()
                                .getResourceAsStream("csv/yoga-raw.csv"))))) {
            List<String[]> r = reader.readAll();
            r.forEach(row -> {
                YogaWorkout yoga = YogaWorkout.builder()
                        .name(row[0])
                        .description(row[1])
                        .videoUrl(row[2])
                        .imageUrl(row[3])
                        .level(Integer.parseInt(row[4]))
                        .duration(Integer.parseInt(row[5]))
                        .point(Double.parseDouble(row[6]))
                        .instruction(row[7])
                        .build();
                yogaRepository.save(yoga);
            });
        }
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
    }

}
