package com.ssafy.duck.domain.hint.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
public enum HintErrorCode {

    HINT_QUESTION_NOT_FOUND(3001, "HINT_ERROR_3001", "힌트를 찾을 수 없습니다.");

    private int status;
    private String errorCode;
    private String message;

}
