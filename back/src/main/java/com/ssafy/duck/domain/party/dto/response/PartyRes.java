package com.ssafy.duck.domain.party.dto.response;

import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.party.dto.request.StartReq;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PartyRes {

    private Long partyId;
    private String accessCode;
    private String partyName;
    private Instant startTime;
    private Instant endTime;
    private boolean deleted;
    private Long userId;

    public boolean getDeleted() {
        return this.deleted;
    }

    public boolean isValid(StartReq startReq, PartyRes partyRes) {

        if (partyRes.getDeleted()) {
            // 삭제된 파티 일 경우
            throw new PartyException(PartyErrorCode.NOT_FOUND_PARTY);
        }
        if (!partyRes.getUserId().equals(startReq.getUserId())) {
            // 파티 생성자가 아닌 사용자가 시작하려고 한 경우
            throw new PartyException(PartyErrorCode.ACCESS_DENIED);
        }
        if (partyRes.getStartTime() != null) {
            // 이미 시작한 파티인 경우
            throw new PartyException(PartyErrorCode.ALREADY_STARTED_PARTY);
        }
        if (calcDate(Instant.now() + "", startReq.getEndTime()) < 3 || calcDate(Instant.now() + "", startReq.getEndTime()) > 7) {
            // 설정한 날짜가 3일보다 작거나, 7일보다 클 경우
            throw new PartyException(PartyErrorCode.MAXIMUM_OF_7_DAYS_ALLOWED);
        }
        // TODO: 현재일보다 이전 날짜 입력했을 때
        // TODO: 인원 수가 적을 10명보다 적을 때

        return true;
    }

    // String 예제형식 "2024-03-14T12:00:00Z"
    public static int calcDate(String start, String end) {

        // String -> Instant
        Instant startTime = Instant.parse(start);
        Instant endTime = Instant.parse(end);

        // 시스템 기본 시간대(ZoneId)를 사용하여 LocalDate로 변환
        LocalDate startDate = startTime.atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDate = endTime.atZone(ZoneId.systemDefault()).toLocalDate();

        return (int) ChronoUnit.DAYS.between(startDate, endDate);
    }

}
