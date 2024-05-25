package org.webdev.carex.dto.user;


import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.webdev.carex.entity.WeightPlan;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthyInfoDto {
    @NotNull(message = "Weight is required")
    @Min(value = 1, message = "Weight must be greater than 0")
    @Max(value = 500, message = "Weight must be less than 500")
    private Double weight;
    @NotNull(message = "Height is required")
    @Min(value = 1, message = "Height must be greater than 0")
    @Max(value = 300, message = "Height must be less than 300")
    private Double height;
    private Integer age;
    @NotNull(message ="Gender is required")
    private boolean male;
    private Double bmi;
    private Double bmr;
    @NotNull(message = "Weight plan is required")
    private WeightPlanDto weightPlan;
    @NotNull(message = "Activity level is required")
    private Integer activityLevel;
    @NotNull(message = "Meal per day is required")
    @Min(value = 3, message = "Meal per day must be equal or greater than 3")
    @Max(value = 5, message = "Meal per day must be equal or less than 5")
    private Integer mealPerDay;
}
