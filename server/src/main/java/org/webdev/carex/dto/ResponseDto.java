package org.webdev.carex.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {
    @JsonAlias("status_code")
    private String statusCode;
    private String result;
    private ErrorDto error;
    private T data;
}
