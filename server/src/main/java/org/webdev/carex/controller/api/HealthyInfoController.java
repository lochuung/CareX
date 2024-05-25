package org.webdev.carex.controller.api;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.user.HealthyInfoDto;
import org.webdev.carex.entity.WeightPlan;
import org.webdev.carex.service.HealthyService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/healthiness")
@SecurityRequirement(name = "bearerAuth")
public class HealthyInfoController {
    @Autowired
    private HealthyService healthyService;

    @GetMapping("/info")
    public ResponseDto<HealthyInfoDto> getHealthyInfo(Authentication authentication) {
        String email = authentication.getName();
        return ResponseDto.success(healthyService.getHealthyInfo(email));
    }

    @PostMapping("/info")
    public ResponseDto<HealthyInfoDto> updateHealthyInfo(Authentication authentication,
                                                         @Valid
                                                         @RequestBody HealthyInfoDto healthyInfoDto) {
        String email = authentication.getName();
        return ResponseDto.success(healthyService.updateHealthyInfo(email, healthyInfoDto));
    }

    @GetMapping("/weight-plans")
    public ResponseDto<List<WeightPlan>> getAllWeightPlan() {
        return ResponseDto.success(healthyService.getAllWeightPlan());
    }
}
