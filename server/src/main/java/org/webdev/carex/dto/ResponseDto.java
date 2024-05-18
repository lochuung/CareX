package org.webdev.carex.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.webdev.carex.constant.ResponseConstant;

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

    public static <T> ResponseDto<T> success(T data) {
        return ResponseDto.<T>builder()
                .statusCode("200")
                .result(ResponseConstant.SUCCESS)
                .data(data)
                .build();
    }

    public static <T> ResponseDto<T> error(ErrorDto error, String statusCode) {
        return ResponseDto.<T>builder()
                .statusCode(statusCode)
                .result(ResponseConstant.FAIL)
                .error(error)
                .build();
    }
}
