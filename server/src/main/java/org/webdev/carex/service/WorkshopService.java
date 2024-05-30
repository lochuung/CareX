package org.webdev.carex.service;

import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.JoinWorkshopResponseDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;

import java.util.List;

public interface WorkshopService {
    ResponseDto<List<WorkshopResponseDto>> getAllWorkshop();

    ResponseDto<WorkshopResponseDto> getWorkshopById(Long id);

    ResponseDto<WorkshopResponseDto> editWorkshop(Long id, WorkshopRequestDto workshopRequestDto, String email);

    ResponseDto<String> deleteWorkshop(Long id, String email);

    ResponseDto<JoinWorkshopResponseDto> joinWorkshop(Long id, String email);

    ResponseDto<JoinWorkshopResponseDto> outWorkshop(Long id, String email);

    ResponseDto<WorkshopResponseDto> cancelWorkshop(Long id, String email);

    ResponseDto<WorkshopResponseDto> createNewWorkshop(WorkshopRequestDto workshopRequestDto, String email);

    ResponseDto<Boolean> checkIsJoinedWorkshop(Long id, String email);
}
