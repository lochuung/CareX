package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.WeightPlan;

public interface WeightPlanRepository extends JpaRepository<WeightPlan, Long> {
}
