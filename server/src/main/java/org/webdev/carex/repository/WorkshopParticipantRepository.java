package org.webdev.carex.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.Workshop;
import org.webdev.carex.entity.WorkshopParticipant;
import org.webdev.carex.entity.key.WorkshopParticipantKey;

import java.util.List;
import java.util.Optional;

public interface WorkshopParticipantRepository extends JpaRepository<WorkshopParticipant, WorkshopParticipantKey> {

    boolean existsById_UserAndId_Workshop(User id_user, Workshop id_workshop);

    List<WorkshopParticipant> findAllById_Workshop_Id(Long id);
}
