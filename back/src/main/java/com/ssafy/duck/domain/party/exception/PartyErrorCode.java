package com.ssafy.duck.domain.party.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.zalando.problem.Status;

@Getter
@AllArgsConstructor
public enum PartyErrorCode {

    ALREADY_STARTED_PARTY(Status.BAD_REQUEST, "이미 시작한 파티입니다."),
    MAXIMUM_OF_1_PARTY_ALLOWED(Status.BAD_REQUEST, "파티는 최대 1개만 생성 할 수 있습니다."),
    NOT_FOUND_PARTY(Status.NOT_FOUND, "찾을 수 없는 파티입니다."),
    NOT_FOUND_GUEST(Status.NOT_FOUND, "찾을 수 없는 파티 참가자입니다."),
    FORBIDDEN_USER(Status.FORBIDDEN, "해당 파티에 권한이 없는 유저입니다.");

    private final Status status;
    private final String detail;

}
