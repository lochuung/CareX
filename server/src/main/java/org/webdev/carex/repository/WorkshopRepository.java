package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.Workshop;

<<<<<<< HEAD
public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
=======
import java.time.LocalDateTime;
import java.util.List;

public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
    List<Workshop> findAllByCancelledFalseAndStartTimeBefore(LocalDateTime now);
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
}
