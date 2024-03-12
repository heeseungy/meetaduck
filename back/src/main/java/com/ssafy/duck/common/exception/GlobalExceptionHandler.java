package com.ssafy.duck.common.exception;

import com.ssafy.duck.domain.hint.exception.HintException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(HintException.class)
    public ResponseEntity<Object> hintExceptionHandler(HintException e){
        log.error(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(e.getMessage());
    }

}
