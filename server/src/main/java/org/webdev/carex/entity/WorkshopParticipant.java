package org.webdev.carex.entity;

import jakarta.persistence.*;
import lombok.*;
import org.webdev.carex.entity.key.WorkshopParticipantKey;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "workshops_participants")
public class WorkshopParticipant {
    @EmbeddedId
    private WorkshopParticipantKey id;

    private boolean sent;
}
