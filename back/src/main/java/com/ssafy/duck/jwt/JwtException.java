package com.ssafy.duck.jwt;

public class JwtException extends RuntimeException {
    private final JwtErrorCode errorCode;

    public JwtException(JwtErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
