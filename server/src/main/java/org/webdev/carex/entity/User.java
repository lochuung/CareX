package org.webdev.carex.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.webdev.carex.entity.common.BaseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private LocalDate birthday;

    private String password;

    private boolean enabled;

    @ColumnDefault(value = "0")
    private BigDecimal point;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER
            , cascade = CascadeType.ALL)
    private HealthyInfo healthyInfo;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles", joinColumns =
    @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns =
            @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private List<Role> roles;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<VerifyCode> verifyCodes;

    @ManyToMany(mappedBy = "participants", fetch = FetchType.LAZY)
    private List<Workshop> joinedWorkshops;

    @OneToMany(mappedBy = "host", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Workshop> hostWorkshops;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Post> posts;

    @ManyToMany(mappedBy = "likes", fetch = FetchType.LAZY)
    private List<Post> likedPosts;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WorkoutHistory> workoutHistories;

}
