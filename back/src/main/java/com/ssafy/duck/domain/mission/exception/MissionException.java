package com.ssafy.duck.domain.mission.exception;

import com.ssafy.duck.domain.hint.exception.HintErrorCode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class MissionException extends RuntimeException{
    private final MissionErrorCode errorCode;

    public MissionException(MissionErrorCode e) {
        super(e.getMessage());
        this.errorCode = e;
    }
}
