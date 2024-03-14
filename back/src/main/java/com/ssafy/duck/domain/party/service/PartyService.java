package com.ssafy.duck.domain.party.service;

import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.party.dto.request.StartReq;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import com.ssafy.duck.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class PartyService {

    private final GuestService guestService;

    private final PartyRepository partyRepository;
    private final UserRepository userRepository;

    public String create(String partyName, Long userId) {
        if (guestService.isGuest(userId)) {
            // TODO: userId로 List<Guest> 가져옴
            //      partyId로 party를 조회
            //      deleted=true면 continue / false면 예외처리 추가
            throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_ALLOWED);
        }

        String chracters = "abcdefghijklmnopqrstuvwxyz0123456789";
        String accessCode = ThreadLocalRandom.current()
                .ints(6, 0, chracters.length())
                .mapToObj(chracters::charAt)
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        Party party = Party.builder()
                .accessCode(accessCode)
                .partyName(partyName)
                .startTime(null)
                .endTime(null)
                .deleted(false)
                .user(userRepository.findByUserId(userId))
                .build();
        partyRepository.save(party);

        return accessCode;
    }

    public PartyRes find(String accessCode) {
        Party party = partyRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
        PartyRes partyRes = toPartyRes(party);
        if (partyRes.getDeleted()) {
            throw new PartyException(PartyErrorCode.NOT_FOUND_PARTY);
        }

        return partyRes;
    }

    public void start(PartyRes partyRes, StartReq startReq) {
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

        Party party = partyRepository.findByAccessCode(partyRes.getAccessCode())
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
        party.start(Instant.parse(startReq.getEndTime()));

        partyRepository.save(party);
    }

    public void delete(String accessCode) {
        Party party = partyRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
        party.delete();
        partyRepository.save(party);
    }

    public PartyRes toPartyRes(Party party) {
        if (party.getPartyId() == null) {
            return null;
        }
        return PartyRes.builder()
                .partyId(party.getPartyId())
                .accessCode(party.getAccessCode())
                .partyName(party.getPartyName())
                .startTime(party.getStartTime())
                .endTime(party.getEndTime())
                .deleted(party.isDeleted())
                .userId(party.getUser().getUserId())
                .build();
    }

    // String 예제형식 "2024-03-14T12:00:00Z"
    public int calcDate(String start, String end) {

        // String -> Instant
        Instant startTime = Instant.parse(start);
        Instant endTime = Instant.parse(end);

        // 시스템 기본 시간대(ZoneId)를 사용하여 LocalDate로 변환
        LocalDate startDate = startTime.atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDate = endTime.atZone(ZoneId.systemDefault()).toLocalDate();

        return (int) ChronoUnit.DAYS.between(startDate, endDate);
    }

}
