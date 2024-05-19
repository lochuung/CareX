package org.webdev.carex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.webdev.carex.constant.ResponseConstants;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {
    private Integer status;
    private String result;
    private ErrorDto error;
    private T data;

    public static <T> ResponseDto<T> success(T data) {
        return ResponseDto.<T>builder()
                .status(200)
                .result(ResponseConstants.SUCCESS)
                .data(data)
                .build();
    }

    public static <T> ResponseDto<T> error(ErrorDto error, int statusCode) {
        return ResponseDto.<T>builder()
                .status(statusCode)
                .result(ResponseConstants.FAIL)
                .error(error)
                .build();
    }
}
