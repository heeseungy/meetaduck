package com.ssafy.duck.domain.result.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ResultErrorCode {

    FAVORABILITY_RESULT_NOT_FOUND("참가자의 우호도 결과를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    MY_RESULT_NOT_FOUND("참가자의 결과를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    MANITI_RESULT_NOT_FOUND("참가자의 마니띠의 결과를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    MANITO_RESULT_NOT_FOUND("참가자의 마니또의 결과를 찾을 수 없습니다", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus httpStatus;
}
