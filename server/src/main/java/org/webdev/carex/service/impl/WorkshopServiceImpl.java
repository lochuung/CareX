package org.webdev.carex.service.impl;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.JoinWorkshopResponseDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.Workshop;
import org.webdev.carex.entity.WorkshopParticipant;
import org.webdev.carex.entity.key.WorkshopParticipantKey;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.repository.WorkshopParticipantRepository;
import org.webdev.carex.repository.WorkshopRepository;
import org.webdev.carex.service.EmailService;
import org.webdev.carex.service.WorkshopService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkshopServiceImpl implements WorkshopService {
    private final WorkshopRepository workshopRepository;
    private final WorkshopParticipantRepository workshopParticipantRepository;
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
        workshopResponseDto.setTotalPeople(workshop.getParticipants().size());
        workshopResponseDto.setStartTime(workshop.getStartTime());
        workshopResponseDto.setEndTime(workshop.getEndTime());
        workshopResponseDto.setCancelled(workshop.isCancelled());
        workshopResponseDto.setFinished(workshop.isFinished());
        System.out.println(workshopResponseDto.getTotalPeople());
        return workshopResponseDto;
    }

    @Override
    public ResponseDto<List<WorkshopResponseDto>> getAllWorkshop() {
        List<Workshop> workshops = workshopRepository.findAll();
        List<WorkshopResponseDto> workshopResponseDtos = new ArrayList<>();
        for (Workshop workshop : workshops){
            if (!workshop.isCancelled() && !workshop.isFinished()){
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
                workshopRepository.save(workshop);
            }
        }
    }
    @Scheduled(fixedRate = 60*1000)
    public void checkTimeWorkshop() throws MessagingException {
        LocalDateTime oneDayAhead = LocalDateTime.now().plusDays(1);
        List<Workshop> workshops = workshopRepository
                .findAllByCancelledFalseAndStartTimeBefore(oneDayAhead);

        for (Workshop workshop : workshops){
            // add workshop participants if not exist
            List<User> participants = workshop.getParticipants();
            for (User participant : participants){
                if (!workshopParticipantRepository.existsById_UserAndId_Workshop(participant,
                        workshop)){
                    WorkshopParticipant workshopParticipant =
                            WorkshopParticipant.builder()
                                    .id(
                                            WorkshopParticipantKey.builder()
                                                    .user(participant)
                                                    .workshop(workshop)
                                                    .build()
                                    )
                                    .sent(false)
                                    .build();
                    workshopParticipantRepository.save(workshopParticipant);
                }
            }


        List<WorkshopParticipant> participantsToNotify = workshopParticipantRepository
                .findAllById_Workshop_IdAndSentFalse(workshop.getId());
        for (WorkshopParticipant participant : participantsToNotify){
            if (participant.isSent()){
                continue;
            }
            log.info("Send email to {}", participant.getId().getUser().getEmail());

            emailService.sendEmail(participant.getId().getUser().getEmail(), "Workshop",
                    "Workshop " + workshop.getName() + " will start at " + workshop.getStartTime());
            participant.setSent(true);
        }
        workshopParticipantRepository.saveAll(participantsToNotify);
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

        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Workshop workshop1 = Workshop.builder()
                        .name("test1")
                        .description("test1")
                        .address("test1")
                        .imageUrl("http://link")
                        .host(users.get(0))
                        .participants(users)
                        .startTime(LocalDateTime.now())
                        .endTime(LocalDateTime.now().plusDays(1))
                        .cancelled(false)
                        .finished(false)
                        .build();
        workshopRepository.save(workshop1);
        Workshop workshop2 = Workshop.builder()
                .name("test2")
                .description("test2")
                .address("test2")
                .imageUrl("http://link")
                .host(users.get(0))
                .participants(users)
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now().plusDays(1))
                .cancelled(false)
                .finished(false)
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
        List<WorkshopParticipant> workshopParticipants = workshopParticipantRepository.findAllById_Workshop_Id(id);
        Workshop workshop = workshopRepository.findById(id).orElseThrow(() -> new RuntimeException("Workshop not exist"));
        User host = workshop.getHost();
        if (host.getEmail().equals(email)) {
            workshopParticipantRepository.deleteAll(workshopParticipants);
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
        if (email.equals(workshop.getHost().getEmail())){
            throw new RuntimeException("You are host");
        }
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
        if (workshopRequestDto.getStartTime().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Start time must be after current time");
        }
        // user have CREATE_WORKSHOP privilege
        user.getRoles().stream()
                .flatMap(role -> role.getPrivileges().stream())
                .filter(privilege -> privilege.getName().equals("CREATE_WORKSHOP"))
                .findAny()
                .orElseThrow(() ->
                        new RuntimeException("You don't have permission to create workshop"));

        Workshop workshop = new Workshop();
        workshop.setHost(user);
        workshop.setName(workshopRequestDto.getName());
        workshop.setDescription(workshopRequestDto.getDescription());
        workshop.setAddress(workshopRequestDto.getAddress());
        workshop.setImageUrl(workshopRequestDto.getImageUrl());
        workshop.setStartTime(workshopRequestDto.getStartTime());
        workshop.setEndTime(workshopRequestDto.getEndTime());
        workshop.setParticipants(List.of(user));
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
