package com.ssafy.duck.domain.hint.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum HintErrorCode {

    QUESTION_NOT_FOUND("힌트를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;

}
