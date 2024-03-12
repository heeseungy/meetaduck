package com.ssafy.duck.domain.party.service;

import com.ssafy.duck.domain.party.dto.request.StartReq;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import com.ssafy.duck.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;
    private final UserRepository userRepository;

    public Party find(String accessCode) {
        return partyRepository.findByAccessCode(accessCode);
    }

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

    public void delete(String accessCode) {
        Party party = partyRepository.findByAccessCode(accessCode);
        party.delete();
        partyRepository.save(party);
    }

    public void start(PartyRes partyRes, StartReq startReq) {
        Party party = partyRepository.findByAccessCode(partyRes.getAccessCode());
        party.start(startReq.getEndTime());
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

}
