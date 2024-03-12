package com.ssafy.duck.domain.hint.exception;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class HintExceptionHandler {
    @ExceptionHandler(HintException.class)
    protected ResponseEntity<HintErrorResponse> handleHintException(HintException ex){
        log.error("HintException", ex);
        HintErrorResponse response = new HintErrorResponse(ex.getHintErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getHintErrorCode().getStatus()));
    }
}
