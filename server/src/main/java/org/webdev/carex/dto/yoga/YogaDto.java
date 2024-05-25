package org.webdev.carex.dto.yoga;

import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.webdev.carex.dto.BaseDto;
import org.webdev.carex.entity.WorkoutHistory;

import java.util.List;

@Data
@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class YogaDto extends BaseDto {
    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private String videoUrl;

    private Integer level;

    private Double point;

    private Integer duration;
    private String instruction;
}
