package com.ssafy.duck.domain.guest.service;

import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GuestService {

    @Autowired
    private final GuestRepository guestRepository;

    public List<GuestRes> toGuestResList(List<Guest> guests) {
        List<GuestRes> guestResList = new ArrayList<>();
        for (Guest guest : guests) {
            GuestRes guestRes = GuestRes.builder()
                    .guestId(guest.getGuestId())
                    .manatiId(guest.getManitiId())
                    .votedId(guest.getVotedId())
                    .partyId(guest.getParty().getPartyId())
                    .chatId(guest.getChat().getChatId())
                    .userId(guest.getUser().getUserId())
                    .build();
            guestResList.add(guestRes);
        }
        return guestResList;
    }

    public List<GuestRes> getAllGuest(Long partyId){

        List<Guest> guestList = guestRepository.findAllByPartyPartyId(partyId);
        List<GuestRes> guestResList = toGuestResList(guestList);
        return guestResList;



    }

}
