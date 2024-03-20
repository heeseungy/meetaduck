package com.ssafy.duck.domain.result.exception;

import lombok.Getter;

@Getter
public class ResultException extends RuntimeException{
    private final ResultErrorCode errorCode;

    public ResultException(ResultErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
