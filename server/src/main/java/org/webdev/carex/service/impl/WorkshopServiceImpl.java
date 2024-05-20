package org.webdev.carex.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.Workshop;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.repository.WorkshopRepository;
import org.webdev.carex.service.WorkshopService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkshopServiceImpl implements WorkshopService {
    private final WorkshopRepository workshopRepository;
    private final UserRepository userRepository;

    //Initialize new workshop response dto
    private WorkshopResponseDto newWorkshopResponseDto(Workshop workshop) {
        WorkshopResponseDto workshopResponseDto = new WorkshopResponseDto();
        workshopResponseDto.setId(workshop.getId());
        workshopResponseDto.setDescription(workshop.getDescription());
        workshopResponseDto.setName(workshop.getName());
        workshopResponseDto.setAddress(workshop.getAddress());
        workshopResponseDto.setHostName(workshop.getHost().getFullName());
        workshopResponseDto.setStartTime(workshop.getStartTime());
        workshopResponseDto.setEndTime(workshop.getEndTime());
        workshopResponseDto.setCancelled(false);
        workshopResponseDto.setFinished(false);
        return workshopResponseDto;
    }

    @Override
    public ResponseDto<List<WorkshopResponseDto>> getAllWorkshop() {
        List<Workshop> workshops = workshopRepository.findAll();
        List<WorkshopResponseDto> workshopResponseDtos = new ArrayList<>();
        for (Workshop workshop : workshops){
            WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
            workshopResponseDtos.add(workshopResponseDto);
        }
        return ResponseDto.success(workshopResponseDtos);
    }

    @Override
    public ResponseDto<WorkshopResponseDto> getWorkshopById(Long id) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(()->new RuntimeException("Workshop not exist"));
        WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
        return ResponseDto.success(workshopResponseDto);
    }

    @Override
    public ResponseDto<WorkshopResponseDto> createWorkshop(WorkshopRequestDto workshopCreateRequestDto) {
        User user = userRepository.findByFullName(workshopCreateRequestDto.getHostName()).orElseThrow(()->new RuntimeException("User not exist"));
        Workshop workshop = new Workshop();
        workshop.setName(workshopCreateRequestDto.getName());
        workshop.setDescription(workshopCreateRequestDto.getDescription());
        workshop.setAddress(workshopCreateRequestDto.getAddress());
        workshop.setImageUrl(workshopCreateRequestDto.getImageUrl());
        workshop.setHost(user);
        workshop.setStartTime(workshopCreateRequestDto.getStartTime());
        workshop.setEndTime(workshopCreateRequestDto.getEndTime());
        workshop.setCancelled(false);
        workshop.setFinished(false);
        workshopRepository.save(workshop);
        WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
        return ResponseDto.success(workshopResponseDto);
    }
}
