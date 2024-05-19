package org.webdev.carex.exception;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = false)
@Slf4j
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BadRequestException extends RuntimeException {
    private String code;
    private String message;

    public static BadRequestException message(String message) {
        return BadRequestException.builder()
                .code(HttpStatus.BAD_REQUEST.toString())
                .message(message)
                .build();
    }
}