package com.ssafy.duck.domain.hint.exception;

import lombok.*;

@Getter
@Setter
public class HintErrorResponse {
    private int status;
    private String message;
    private String code;

    public HintErrorResponse(HintErrorCode hintErrorCode) {
        this.status = hintErrorCode.getStatus();
        this.message = hintErrorCode.getMessage();
        this.code = hintErrorCode.getErrorCode();
    }
}
