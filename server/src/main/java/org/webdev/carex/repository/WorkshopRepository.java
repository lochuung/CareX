package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.Workshop;

public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
}
