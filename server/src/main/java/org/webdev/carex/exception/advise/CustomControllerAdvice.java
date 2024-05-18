package org.webdev.carex.exception.advise;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.webdev.carex.dto.ErrorDto;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.exception.BadRequestException;
import org.webdev.carex.exception.UnauthorizedException;

import java.time.LocalDateTime;

@ControllerAdvice
@ResponseBody
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CustomControllerAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<Object> badRequest(BadRequestException e) {
        logger.error(e.getMessage(), e.getCause());

        ErrorDto error = ErrorDto.builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.badRequest()
                .body(ResponseDto.error(
                        error,
                        HttpStatus.BAD_REQUEST.toString()
                ));
    }

    @ExceptionHandler({UnauthorizedException.class})
    public ResponseEntity<Object> unauthorized(UnauthorizedException e) {
        ErrorDto error = ErrorDto.builder()
                .message(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ResponseDto.error(
                        error,
                        HttpStatus.UNAUTHORIZED.toString()
                ));
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> ex(Exception e) {
        logger.error(e.getMessage(), e.getCause());

        ErrorDto error = ErrorDto.builder()
                .message(e.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseDto.error(
                        error,
                        HttpStatus.INTERNAL_SERVER_ERROR.toString()
                ));
    }
}