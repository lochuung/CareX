package org.webdev.carex.service;

import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;

import java.util.List;

public interface WorkshopService {
    ResponseDto<List<WorkshopResponseDto>> getAllWorkshop();

    ResponseDto<WorkshopResponseDto> getWorkshopById(Long id);

    ResponseDto<WorkshopResponseDto> createWorkshop(WorkshopRequestDto workshopCreateRequestDto);
}
