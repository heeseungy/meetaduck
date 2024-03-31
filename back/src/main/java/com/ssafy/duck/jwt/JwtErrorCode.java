package com.ssafy.duck.jwt;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
public enum JwtErrorCode {
    INVALID_JWT("올바르지 않은 JWT입니다.", HttpStatus.UNAUTHORIZED);

    private final String message;
    private final HttpStatus httpStatus;
}
