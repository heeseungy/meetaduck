package com.ssafy.duck.domain.party.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.zalando.problem.Status;

@Getter
@AllArgsConstructor
public enum PartyErrorCode {

    NOT_FOUND_ROOM(Status.NOT_FOUND, "찾을 수 없는 파티입니다."),
    NOT_FOUND_CREATOR(Status.NOT_FOUND, "찾을 수 없는 파티 생성자입니다."),
    NOT_FOUND_GUEST(Status.NOT_FOUND, "찾을 수 없는 파티 참가자입니다."),
    UNAUTHORIZED_USER(Status.UNAUTHORIZED, "해당 방에 대해 권한이 없는 사용자입니다.");

    private final Status status;
    private final String detail;

}
