package org.webdev.carex.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;

@EqualsAndHashCode(callSuper = true)
@Slf4j
@Data
@AllArgsConstructor
@Builder
public class UnauthorizedException extends RuntimeException {
}