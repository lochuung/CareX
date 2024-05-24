package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.HealthyInfo;

public interface HealthyInfoRepository extends JpaRepository<HealthyInfo, Long> {
}
