package org.webdev.carex.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.webdev.carex.dto.yoga.WorkoutHistoryDto;
import org.webdev.carex.entity.WorkoutHistory;

import java.util.List;

@Mapper
public interface YogaHistoryMapper {
    YogaHistoryMapper INSTANCE = Mappers.getMapper(YogaHistoryMapper.class);

    // YogaHistoryResponse to YogaHistory
    @Mapping(source = "done", target = "isDone")
    WorkoutHistory toYogaHistory(WorkoutHistoryDto yogaHistoryDto);
    // YogaHistory to YogaHistoryResponse
    @Mapping(source = "done", target = "isDone")
    WorkoutHistoryDto toYogaHistoryDto(WorkoutHistory yogaHistory);

    // List<YogaHistoryResponse> to List<YogaHistory>
    List<WorkoutHistory> toYogaHistoryList(List<WorkoutHistoryDto> yogaHistoryDtos);
    // List<YogaHistory> to List<YogaHistoryResponse>
    List<WorkoutHistoryDto> toYogaHistoryDtoList(List<WorkoutHistory> yogaHistories);

}
