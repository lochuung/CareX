package org.webdev.carex.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "healthy_infos")
public class HealthyInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ColumnDefault(value = "0")
    private Double weight;
    @ColumnDefault(value = "0")
    private Double height;

    private Integer age;

    @ColumnDefault(value = "true")
    private boolean male;

    @ColumnDefault(value = "0")
    private Double bmi;

    @ColumnDefault(value = "0")
    private Double bmr;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "weight_plan_id", referencedColumnName = "id")
    private WeightPlan weightPlan;

    @ColumnDefault(value = "0")
    private Integer activityLevel;

    @ColumnDefault(value = "3")
    private Integer mealPerDay;
}
