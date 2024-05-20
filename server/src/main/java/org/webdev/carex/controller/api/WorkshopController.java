package org.webdev.carex.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.JoinWorkshopRequestDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.JoinWorkshopResponseDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;
import org.webdev.carex.service.WorkshopService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/workshops")
public class WorkshopController {
    private final WorkshopService workshopService;

    //-----WORKSHOP API-----//
    //Get all workshop
    @GetMapping("/all")
    public ResponseEntity<ResponseDto<List<WorkshopResponseDto>>> getAllWorkshop(){
        return ResponseEntity.ok().body(workshopService.getAllWorkshop());
    }
    //Get workshop by id
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> getWorkshopById(@PathVariable Long id){
        return ResponseEntity.ok().body(workshopService.getWorkshopById(id));
    }
    //Edit workshop
    @PutMapping("/{id}/edit")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> editWorkshop(@PathVariable Long id, @RequestBody WorkshopRequestDto workshopEditRequestDto){
        return ResponseEntity.ok().body(workshopService.editWorkshop(workshopEditRequestDto, id));
    }
    //Delete workshop
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<ResponseDto<String>> deleteWorkshop(@PathVariable Long id, @RequestBody JoinWorkshopRequestDto deleteWorkshopRequestDto){
        return ResponseEntity.ok().body(workshopService.deleteWorkshop(deleteWorkshopRequestDto, id));
    }
    //Join workshop
    @PostMapping("/{id}/join")
    public ResponseEntity<ResponseDto<JoinWorkshopResponseDto>> joinWorkshop(@PathVariable Long id, @RequestBody JoinWorkshopRequestDto joinWorkshopRequestDto){
        return ResponseEntity.ok().body(workshopService.joinWorkshop(joinWorkshopRequestDto, id));
    }
    //Out workshop
    @PostMapping("/{id}/out")
    public ResponseEntity<ResponseDto<JoinWorkshopResponseDto>> outWorkshop(@PathVariable Long id, @RequestBody JoinWorkshopRequestDto outWorkshopRequestDto){
        return ResponseEntity.ok().body(workshopService.outWorkshop(outWorkshopRequestDto, id));
    }
    //Cancel workshop
    @PostMapping("/{id}/cancel")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> cancelWorkshop(@PathVariable Long id, @RequestBody JoinWorkshopRequestDto cancelWorkshopRequestDto){
        return ResponseEntity.ok().body(workshopService.cancelWorkshop(cancelWorkshopRequestDto, id));
    }
}
