package com.ssafy.duck.domain.party.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.zalando.problem.Status;

@Getter
@AllArgsConstructor
public enum PartyErrorCode {

    ALREADY_STARTED_PARTY(Status.BAD_REQUEST, "이미 시작한 파티입니다."),
    MAXIMUM_OF_1_PARTY_ALLOWED(Status.BAD_REQUEST, "파티는 최대 1개만 생성 할 수 있습니다."),
    MAXIMUM_OF_1_PARTY_JOINED(Status.BAD_REQUEST, "파티는 최대 1개만 가입 할 수 있습니다."),
    MAXIMUM_OF_7_DAYS_ALLOWED(Status.BAD_REQUEST, "진행 기간은 최대 7일입니다."),
    THE_TIME_IS_SET_INCORRECTLY(Status.BAD_REQUEST, "파티 종료 시간은 현재 시간보다 이후여야 합니다."),
    NOT_ENOUGH_PEOPLE(Status.BAD_REQUEST, "파티 최소 인원은 3명 입니다."),
    PARTY_IS_IN_PROGRESS(Status.BAD_REQUEST, "아직 파티가 진행 중 입니다."),
    NOT_FOUND_PARTY(Status.NOT_FOUND, "찾을 수 없는 파티입니다."),
    ACCESS_DENIED(Status.FORBIDDEN, "해당 파티에 권한이 없는 유저입니다.");

    private final Status status;
    private final String detail;

}
