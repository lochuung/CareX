package org.webdev.carex.entity;

import jakarta.persistence.*;
import lombok.*;
import org.webdev.carex.entity.common.BaseEntity;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "workshops")
public class Workshop extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String address;

    private String imageUrl;

    @ManyToOne // Many workshops can be created by one user
    @JoinColumn(name = "host_id", referencedColumnName = "id")
    private User host;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "workshops_users", joinColumns =
    @JoinColumn(name = "workshop_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "participant_id",
                    referencedColumnName = "id")
    )
    private List<User> participants;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private boolean isCancelled;

    private boolean isFinished;
}
