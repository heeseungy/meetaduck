package com.ssafy.duck.domain.party.service;

import com.ssafy.duck.domain.party.dto.request.CreateReq;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import com.ssafy.duck.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.print.DocFlavor;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;
    private final UserRepository userRepository;

    // get Party Info
    public PartyRes find(String accessCode) {
        return toPartyRes(partyRepository.findByAccessCode(accessCode));
    }

    public PartyRes toPartyRes(Party party) {
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

    // create new party
    public String create(CreateReq createReq) {
        String chracters = "abcdefghijklmnopqrstuvwxyz0123456789";
        String accessCode = ThreadLocalRandom.current()
                .ints(6, 0, chracters.length())
                .mapToObj(chracters::charAt)
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        Party party = Party.builder()
                .accessCode(accessCode)
                .partyName(createReq.getPartyName())
                .startTime(null)
                .endTime(null)
                .deleted(false)
                .user(userRepository.findByUserId(createReq.getUserId()))
                .build();
        partyRepository.save(party);
        return accessCode;
    }

    // start this party

    // delete this party
    public void delete(String accessCode) {
        Party party = partyRepository.findByAccessCode(accessCode);
        party.delete();
        partyRepository.save(party);
    }

}
