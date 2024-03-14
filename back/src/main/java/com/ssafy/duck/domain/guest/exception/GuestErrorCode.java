package com.ssafy.duck.domain.guest.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum GuestErrorCode {

    GUEST_NOT_FOUND("참가자를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
    VOTED_GUEST_NOT_FOUND("투표할 참가자를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
    MANITO_NOT_FOUND("마니또를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
    MANITI_NOT_FOUND("마니띠를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;

}
