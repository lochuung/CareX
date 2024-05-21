package org.webdev.carex.service;

import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.JoinWorkshopRequestDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.JoinWorkshopResponseDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;

import java.util.List;

public interface WorkshopService {
    ResponseDto<List<WorkshopResponseDto>> getAllWorkshop();

    ResponseDto<WorkshopResponseDto> getWorkshopById(Long id);

    void createWorkshop();

    ResponseDto<WorkshopResponseDto> editWorkshop(WorkshopRequestDto workshopEditRequestDto, Long id);

    ResponseDto<String> deleteWorkshop(JoinWorkshopRequestDto deleteWorkshopRequestDto, Long id);

    ResponseDto<JoinWorkshopResponseDto> joinWorkshop(JoinWorkshopRequestDto joinWorkshopRequestDto, Long id);

    ResponseDto<JoinWorkshopResponseDto> outWorkshop(JoinWorkshopRequestDto outWorkshopRequestDto, Long id);

    ResponseDto<WorkshopResponseDto> cancelWorkshop(JoinWorkshopRequestDto cancelWorkshopRequestDto, Long id);
}
