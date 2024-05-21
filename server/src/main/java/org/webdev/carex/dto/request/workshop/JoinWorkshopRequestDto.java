package org.webdev.carex.dto.request.workshop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JoinWorkshopRequestDto {
    private String fullName;
}
