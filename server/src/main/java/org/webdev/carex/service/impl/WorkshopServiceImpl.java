package org.webdev.carex.service.impl;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.JoinWorkshopResponseDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.Workshop;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.repository.WorkshopRepository;
import org.webdev.carex.service.EmailService;
import org.webdev.carex.service.WorkshopService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkshopServiceImpl implements WorkshopService {
    private final WorkshopRepository workshopRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    //Initialize new workshop response dto
    private WorkshopResponseDto newWorkshopResponseDto(Workshop workshop) {
        WorkshopResponseDto workshopResponseDto = new WorkshopResponseDto();
        workshopResponseDto.setId(workshop.getId());
        workshopResponseDto.setDescription(workshop.getDescription());
        workshopResponseDto.setName(workshop.getName());
        workshopResponseDto.setAddress(workshop.getAddress());
        workshopResponseDto.setHostName(workshop.getHost().getEmail());
        workshopResponseDto.setStartTime(workshop.getStartTime());
        workshopResponseDto.setEndTime(workshop.getEndTime());
        workshopResponseDto.setCancelled(workshop.isCancelled());
        workshopResponseDto.setFinished(workshopResponseDto.isFinished());
        return workshopResponseDto;
    }

    @Override
    public ResponseDto<List<WorkshopResponseDto>> getAllWorkshop() {
        List<Workshop> workshops = workshopRepository.findAll();
        List<WorkshopResponseDto> workshopResponseDtos = new ArrayList<>();
        for (Workshop workshop : workshops){
            if (!workshop.isCancelled() && workshop.isFinished()){
                WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
                workshopResponseDtos.add(workshopResponseDto);
            }
        }
        return ResponseDto.success(workshopResponseDtos);
    }

    @Scheduled(fixedRate = 60*1000)
    public void updateWorkshopStatus() {
        List<Workshop> workshops = workshopRepository.findAll();
        for (Workshop workshop : workshops){
            if (workshop.getEndTime().isEqual(LocalDateTime.now()) && !workshop.isFinished()){
                workshop.setFinished(true);
            }
        }
    }

    @Scheduled(fixedRate = 5*60*1000)
    public void checkTimeWorkshop() throws MessagingException {
        List<Workshop> workshops = workshopRepository.findAll();
        for (Workshop workshop : workshops){
            if ((workshop.getStartTime().minusMinutes(30)).isBefore(LocalDateTime.now())) {
                User host = workshop.getHost();
                List<User> participants = workshop.getParticipants();
                participants.add(host);
                for (User participant : participants) {
                    emailService.sendEmail(participant.getEmail(), "Workshop", "The workshop begin after 5 minutes");
                }
            }
        }
    }

    @Override
    public ResponseDto<WorkshopResponseDto> getWorkshopById(Long id) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(()->new RuntimeException("Workshop not exist"));
        WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
        return ResponseDto.success(workshopResponseDto);
    }

    @Override
    public void createWorkshop() {
        if (workshopRepository.count() > 0) {
            return;
        }

        User user = userRepository.findByEmail("Admin").orElseThrow(()->new RuntimeException("User not exist"));
        Workshop workshop1 = Workshop.builder()
                        .name("test1")
                        .description("test1")
                        .address("test1")
                        .imageUrl("http://link")
                        .host(user)
                        .startTime(LocalDateTime.now())
                        .endTime(LocalDateTime.now().plusDays(1))
                        .isCancelled(false)
                        .isFinished(false)
                        .build();
        workshopRepository.save(workshop1);
        Workshop workshop2 = Workshop.builder()
                .name("test2")
                .description("test2")
                .address("test2")
                .imageUrl("http://link")
                .host(user)
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now().plusDays(1))
                .isCancelled(false)
                .isFinished(false)
                .build();
        workshopRepository.save(workshop2);
    }

    @Override
    public ResponseDto<WorkshopResponseDto> editWorkshop(Long id, WorkshopRequestDto workshopRequestDto, String email) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(() -> new RuntimeException("Workshop not exist"));
        User host = workshop.getHost();
        if (host.getEmail().equals(email)) {
            workshop.setName(workshopRequestDto.getName());
            workshop.setDescription(workshopRequestDto.getDescription());
            workshop.setAddress(workshopRequestDto.getAddress());
            workshop.setImageUrl(workshopRequestDto.getImageUrl());
            workshop.setStartTime(workshopRequestDto.getStartTime());
            workshop.setEndTime(workshopRequestDto.getEndTime());
            workshopRepository.save(workshop);
        } else {
            throw new RuntimeException("Wrong host");
        }
        WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
        return ResponseDto.success(workshopResponseDto);
    }

    @Override
    public ResponseDto<String> deleteWorkshop(Long id, String email) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(() -> new RuntimeException("Workshop not exist"));
        User host = workshop.getHost();
        if (host.getEmail().equals(email)) {
            workshopRepository.delete(workshop);
        }
        else {
            throw new RuntimeException("Wrong host");
        }
        return ResponseDto.success("Delete successfully");
    }

    @Override
    public ResponseDto<JoinWorkshopResponseDto> joinWorkshop(Long id, String email) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(() -> new RuntimeException("Workshop not exist"));
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not exists"));
        List<User> participants = workshop.getParticipants();
        if (!participants.contains(user)){
            participants.add(user);
            workshop.setParticipants(participants);
            workshopRepository.save(workshop);
        }
        else {
            throw new RuntimeException("You are already join this workshop");
        }
        JoinWorkshopResponseDto joinWorkshopResponseDto = new JoinWorkshopResponseDto();
        joinWorkshopResponseDto.setWorkshopName(workshop.getName());
        joinWorkshopResponseDto.setTotalPeople(participants.size());
        return ResponseDto.success(joinWorkshopResponseDto);
    }

    @Override
    public ResponseDto<JoinWorkshopResponseDto> outWorkshop(Long id, String email) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(() -> new RuntimeException("Workshop not exist"));
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not exists"));
        List<User> participants = workshop.getParticipants();
        if (!participants.contains(user)){
            throw new RuntimeException("You doesn't join this workshop");
        }
        else {
            participants.remove(user);
            workshop.setParticipants(participants);
            workshopRepository.save(workshop);
        }
        JoinWorkshopResponseDto joinWorkshopResponseDto = new JoinWorkshopResponseDto();
        joinWorkshopResponseDto.setWorkshopName(workshop.getName());
        joinWorkshopResponseDto.setTotalPeople(participants.size());
        return ResponseDto.success(joinWorkshopResponseDto);
    }

    @Override
    public ResponseDto<WorkshopResponseDto> cancelWorkshop(Long id, String email) {
        Workshop workshop = workshopRepository.findById(id).orElseThrow(() -> new RuntimeException("Workshop not exist"));
        User host = workshop.getHost();
        if (host.getEmail().equals(email)) {
            workshop.setCancelled(true);
            workshopRepository.save(workshop);
            WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
            workshopResponseDto.setCancelled(true);
            return ResponseDto.success(workshopResponseDto);
        }
        else {
            throw new RuntimeException("Wrong host");
        }
    }

    @Override
    public ResponseDto<WorkshopResponseDto> createNewWorkshop(WorkshopRequestDto workshopRequestDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not exists"));
        Workshop workshop = new Workshop();
        workshop.setHost(user);
        workshop.setName(workshopRequestDto.getName());
        workshop.setDescription(workshopRequestDto.getDescription());
        workshop.setAddress(workshopRequestDto.getAddress());
        workshop.setImageUrl(workshopRequestDto.getImageUrl());
        workshop.setStartTime(workshopRequestDto.getStartTime());
        workshop.setEndTime(workshopRequestDto.getEndTime());
        workshop.setCancelled(false);
        workshop.setFinished(false);
        workshopRepository.save(workshop);
        WorkshopResponseDto workshopResponseDto = newWorkshopResponseDto(workshop);
        return ResponseDto.success(workshopResponseDto);
    }

    @Override
    public ResponseDto<Boolean> checkIsJoinedWorkshop(Long id, String name) {
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("User not exists"));
        Workshop workshop = workshopRepository.findById(id).orElseThrow(()->new RuntimeException("Workshop not exist"));
        List<User> participants = workshop.getParticipants();
        if (!participants.contains(user)){
            return ResponseDto.success(false);
        }
        else {
            return ResponseDto.success(true);
        }
    }
}
