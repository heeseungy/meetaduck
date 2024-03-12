package com.ssafy.duck.domain.hint.exception;

import lombok.Getter;

@Getter
public class HintException extends RuntimeException{
    private final HintErrorCode hintErrorCode;

    public HintException(String message, HintErrorCode hindErrorCode) {
        super(message);
        this.hintErrorCode = hindErrorCode;
    }
}
