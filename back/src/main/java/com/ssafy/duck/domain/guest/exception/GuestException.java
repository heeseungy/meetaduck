package com.ssafy.duck.domain.guest.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class GuestException extends RuntimeException{
    private final GuestErrorCode errorCode;

    public GuestException(GuestErrorCode e) {
        super(e.getMessage());
        this.errorCode = e;
    }
}
