package com.ssafy.duck.domain.party.service;

import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;

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
    // start this party

    // delete this party
    public void delete(String accessCode) {
        Party party = partyRepository.findByAccessCode(accessCode);
        party.delete();
        partyRepository.save(party);
    }

}
