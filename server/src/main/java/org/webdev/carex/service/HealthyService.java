package org.webdev.carex.service;

import org.webdev.carex.dto.user.HealthyInfoDto;
import org.webdev.carex.entity.WeightPlan;

import java.util.List;

public interface HealthyService {
    void createWeightPlanData();

    HealthyInfoDto getHealthyInfo(String email);

    HealthyInfoDto updateHealthyInfo(String email, HealthyInfoDto healthyInfoDto);

    List<WeightPlan> getAllWeightPlan();
}
