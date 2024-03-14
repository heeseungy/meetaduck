package com.ssafy.duck.domain.hint.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class HintException extends RuntimeException {
    private final HintErrorCode errorCode;

    public HintException(HintErrorCode e) {
        super(e.getMessage());
        this.errorCode = e;
    }
}
