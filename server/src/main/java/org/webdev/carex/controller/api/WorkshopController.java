package org.webdev.carex.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;
import org.webdev.carex.service.WorkshopService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class WorkshopController {
    private final WorkshopService workshopService;

    //-----WORKSHOP API-----//
    //Get all workshop
    @GetMapping("/workshop/all")
    public ResponseEntity<ResponseDto<List<WorkshopResponseDto>>> getAllWorkshop(){
        return ResponseEntity.ok().body(workshopService.getAllWorkshop());
    }
    //Get workshop by id
    @GetMapping("/workshop/{id}")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> getWorkshopById(@PathVariable Long id){
        return ResponseEntity.ok().body(workshopService.getWorkshopById(id));
    }
    //Create workshop
    @PostMapping("/workshop/create")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> createWorkshop(@RequestBody WorkshopRequestDto workshopCreateRequestDto){
        return ResponseEntity.ok().body(workshopService.createWorkshop(workshopCreateRequestDto));
    }
    //Edit workshop
    /*@PutMapping("/workshop/{id}/edit")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> editWorkshop(@PathVariable Long id, @RequestBody WorkshopRequestDto workshopEditRequestDto){
        return ResponseEntity.ok().body(workshopService.editWorkshop(workshopEditRequestDto, id));
    }*/
}
