package com.ssafy.duck.domain.mission.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum MissionErrorCode {
    MISSION_NOT_FOUND("미션을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
    MISSION_STATUS_NOT_FOUND("미션 상태를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);


    private final String message;
    private final HttpStatus httpStatus;

}
