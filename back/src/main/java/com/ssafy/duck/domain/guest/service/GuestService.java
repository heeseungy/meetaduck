package com.ssafy.duck.domain.guest.service;

import com.ssafy.duck.domain.chat.service.ChatService;
import com.ssafy.duck.domain.guest.dto.request.VoteReq;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.dto.response.VoteRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.exception.GuestErrorCode;
import com.ssafy.duck.domain.guest.exception.GuestException;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import com.ssafy.duck.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class GuestService {

    @Autowired
    private final UserRepository userRepository;
    private final PartyRepository partyRepository;
    private final GuestRepository guestRepository;
    private final ChatService chatService;

    public VoteRes vote(VoteReq voteReq) {

        Long guestId = voteReq.getGuestId();
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));

        Long votedId = voteReq.getVotedId();
        Guest votedGuest = guestRepository.findById(votedId)
                .orElseThrow(() -> new GuestException(GuestErrorCode.VOTED_GUEST_NOT_FOUND));

        guest.updateVotedId(votedId);

        VoteRes voteRes = VoteRes.builder()
                .guestId(guestId)
                .votedId(votedId)
                .build();

        return voteRes;
    }

    public void deleteByGuestId(Long guestId) {
        guestRepository.deleteById(guestId);
    }

    public void create(String accessCode, Long userId) {
        Guest guest = Guest.builder()
                .manitiId(null)
                .votedId(null)
                .party(partyRepository.findByAccessCode(accessCode))
                .chat(chatService.create(accessCode))
                .user(userRepository.findByUserId(userId))
                .build();
        guestRepository.save(guest);
    }

    public List<Guest> updateManiti(Long partyId) {
        List<Guest> guests = guestRepository.findByParty_PartyId(partyId);
        Collections.shuffle(guests);
        for (int i = 0; i < guests.size(); i++) {
            Guest guest = guests.get(i);
            Long manitiId = (i == guests.size() - 1) ? guests.get(0).getGuestId() : guests.get(i + 1).getGuestId();
            guest.updateManiti(manitiId);
            guestRepository.save(guest);
        }
        return guests;
    }

    public boolean find(Long userId) {
        Optional<Guest> guestOptional = guestRepository.findByUser_UserId(userId);
        return guestOptional.isPresent();
    }

    public GuestRes findByGuestId(Long guestId) {
        Guest guest = guestRepository.findById(guestId).orElseThrow(()-> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));
        return toGuestRes(guest);
    }

    public List<GuestRes> getAllGuest(Long partyId){

        List<Guest> guestList = guestRepository.findByParty_PartyId(partyId);
        List<GuestRes> guestResList = toGuestResList(guestList);
        return guestResList;
    }

    public GuestRes findManito(Long guestId){
        Guest manito = guestRepository.findByManitiId(guestId).orElseThrow(()-> new GuestException(GuestErrorCode.MANITO_NOT_FOUND));
        return toGuestRes(manito);
    }

    public GuestRes toGuestRes(Guest guest){
        GuestRes res = GuestRes.builder()
                .guestId(guest.getGuestId())
                .manatiId(guest.getManitiId())
                .votedId(guest.getVotedId())
                .partyId(guest.getParty().getPartyId())
                .chatId(guest.getChat().getChatId())
                .userId(guest.getUser().getUserId())
                .build();
        return res;
    }


    public List<GuestRes> toGuestResList(List<Guest> guests) {
        List<GuestRes> guestResList = new ArrayList<>();
        for (Guest guest : guests) {
            GuestRes guestRes = toGuestRes(guest);
            guestResList.add(guestRes);
        }
        return guestResList;
    }

}
