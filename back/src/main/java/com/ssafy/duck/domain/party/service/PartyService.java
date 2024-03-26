package com.ssafy.duck.domain.party.service;

import com.ssafy.duck.common.TimeUtil;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.party.dto.request.DeleteReq;
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
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;
    private final UserRepository userRepository;
    private final GuestRepository guestRepository;

    public String create(String partyName, Long userId) {
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

        return toPartyRes(party);
    }

    public void start(PartyRes partyRes, StartReq startReq) {
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

    public boolean isValidCreateReq(Long userId) {
        List<Guest> guests = guestRepository.findAllByUserId(userId);
        for (Guest guest : guests) {
            System.out.println(guest.getParty().getAccessCode());
            Party party = partyRepository.findByPartyId(guest.getParty().getPartyId())
                    .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
            if (!party.isDeleted()) {
                throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_ALLOWED);
            }
        }

        return true;
    }

    public boolean isValidJoinReq(PartyRes partyRes, Long userId) {
        if (partyRes.isDeleted()) {
            // 삭제된 파티 일 경우
            throw new PartyException(PartyErrorCode.DELETED_PARTY);
        }
        List<Guest> joinedGuests = guestRepository.findAllByPartyId(partyRes.getPartyId());
        for (Guest guest : joinedGuests) {
            if (guest.getUser().getUserId().equals(userId)) {
                throw new PartyException(PartyErrorCode.ALREADY_JOINED_PARTY);
            }
        }
        List<Guest> guests = guestRepository.findAllByUserId(userId);
        for (Guest guest : guests) {
            Party party = partyRepository.findByPartyId(guest.getParty().getPartyId())
                    .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
            if (party.getStartTime() == null) {
                if (party.isDeleted()) {
                    throw new PartyException(PartyErrorCode.DELETED_PARTY);
                } else {
                    throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_ALLOWED);
                }
            } else {
                if (!party.isDeleted() && TimeUtil.convertToKST(Instant.now()).isBefore(party.getEndTime())) {
                    throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_ALLOWED);
                }
            }
        }
        if (partyRes.getStartTime() != null) {
            // 시작한 파티일 경우
            throw new PartyException(PartyErrorCode.ALREADY_STARTED_PARTY);
        }

        return true;
    }

    public boolean isValidStartReq(StartReq startReq, PartyRes partyRes) {
        if (partyRes.isDeleted()) {
            // 삭제된 파티 일 경우
            throw new PartyException(PartyErrorCode.DELETED_PARTY);
        }
        if (!partyRes.getUserId().equals(startReq.getUserId())) {
            // 파티 생성자가 아닌 사용자가 시작하려고 한 경우
            throw new PartyException(PartyErrorCode.ACCESS_DENIED);
        }
        if (partyRes.getStartTime() != null) {
            // 이미 시작한 파티인 경우
            throw new PartyException(PartyErrorCode.ALREADY_STARTED_PARTY);
        }
        if (TimeUtil.stringToInstant(startReq.getEndTime()).isBefore(TimeUtil.convertToKST(Instant.now()))) {
            // 현재 일보다 이전 날짜를 입력 했을 때
            throw new PartyException(PartyErrorCode.THE_TIME_IS_SET_INCORRECTLY);
        }
        if (TimeUtil.calcDate(Instant.now() + "", startReq.getEndTime()) < 3 || TimeUtil.calcDate(Instant.now() + "", startReq.getEndTime()) > 7) {
            // 설정한 날짜가 3일보다 작거나, 7일보다 클 경우
            throw new PartyException(PartyErrorCode.MAXIMUM_OF_3_TO_7_DAYS_ALLOWED);
        }
        // 인원 수가 3명보다 적을 때
        Party party = partyRepository.findByAccessCode(startReq.getAccessCode())
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
        List<Guest> guests = guestRepository.findByParty_PartyId(party.getPartyId());
        if (guests.size() <= 2) {
            throw new PartyException(PartyErrorCode.NOT_ENOUGH_PEOPLE);
        }

        return true;
    }

    public boolean isValidDeleteReq(PartyRes partyRes, DeleteReq deleteReq) {
        if (!deleteReq.getUserId().equals(partyRes.getUserId())) {
            // 파티 생성자가 아닌 경우
            throw new PartyException(PartyErrorCode.ACCESS_DENIED);
        }
        // 파티가 시작하기 전에 삭제되는 경우
        if (partyRes.isDeleted()) {
            // 파티가 삭제된 경우
            throw new PartyException(PartyErrorCode.DELETED_PARTY);
        }
        if (partyRes.getStartTime() != null && TimeUtil.convertToKST(Instant.now()).isBefore(partyRes.getEndTime())) {
            // 파티가 진행 중인 경우
            throw new PartyException(PartyErrorCode.PARTY_IS_IN_PROGRESS);
        }

        return true;
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

}
