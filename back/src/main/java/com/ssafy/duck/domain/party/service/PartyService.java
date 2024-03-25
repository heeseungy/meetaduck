package com.ssafy.duck.domain.party.service;

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

    public void isValidCreateReq(Long userId) {
        List<Guest> guests = guestRepository.findAllByUserId(userId);
        for (Guest guest : guests) {
            Party party = partyRepository.findByPartyId(guest.getParty().getPartyId())
                    .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
            if (!party.isDeleted()) {
                throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_ALLOWED);
            }
        }
    }

    public void isValidJoinReq(PartyRes partyRes, Long userId) {
        List<Guest> guests = guestRepository.findAllByUserId(userId);
        for (Guest guest : guests) {
            Party party = partyRepository.findByPartyId(guest.getParty().getPartyId())
                    .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
            if (!party.isDeleted()) {
                throw new PartyException(PartyErrorCode.NOT_FOUND_PARTY);
            }
        }
        if (partyRes.getStartTime() != null) {
            throw new PartyException(PartyErrorCode.ALREADY_STARTED_PARTY);
        }
        List<Guest> joinedGuests = guestRepository.findAllByPartyId(partyRes.getPartyId());
        for (Guest guest : joinedGuests) {
            if (guest.getUser().getUserId().equals(userId)) {
                throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_JOINED);
            }
        }
    }

    public void isValidDeleteReq(PartyRes partyRes, DeleteReq deleteReq) {
        if (!deleteReq.getUserId().equals(partyRes.getUserId())) {
            throw new PartyException(PartyErrorCode.ACCESS_DENIED);
        }
        if (partyRes.getDeleted()) {
            throw new PartyException(PartyErrorCode.NOT_FOUND_PARTY);
        }
        // TODO: 파티가 진행 중인 경우
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
