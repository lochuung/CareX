package org.webdev.carex;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.webdev.carex.dto.mapper.YogaHistoryMapper;
import org.webdev.carex.dto.yoga.WorkoutHistoryDto;
import org.webdev.carex.entity.WorkoutHistory;

@SpringBootTest
class CareXApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testMapper() {
		WorkoutHistory workout = YogaHistoryMapper.INSTANCE.toYogaHistory(
				WorkoutHistoryDto.builder()
						.isDone(true).build()
		);
		assert workout.isDone();
	}

}
