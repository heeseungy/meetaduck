package com.ssafy.duck.domain.guest.service;

import com.ssafy.duck.domain.chat.service.ChatService;
import com.ssafy.duck.domain.guest.dto.request.VoteReq;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.dto.response.PairRes;
import com.ssafy.duck.domain.guest.dto.response.VoteRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.exception.GuestErrorCode;
import com.ssafy.duck.domain.guest.exception.GuestException;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import com.ssafy.duck.domain.result.dto.model.Favorability;
import com.ssafy.duck.domain.result.exception.ResultErrorCode;
import com.ssafy.duck.domain.result.exception.ResultException;
import com.ssafy.duck.domain.result.repository.ResultRepository;
import com.ssafy.duck.domain.user.entity.User;
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
    private final ResultRepository resultRepository;

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

    public void createGuest(String accessCode, Long userId) {
        Guest guest = Guest.builder()
                .manitiId(null)
                .votedId(null)
                .party(partyRepository.findByAccessCode(accessCode)
                        .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY)))
                .chat(chatService.createChat(accessCode))
                .user(userRepository.findByUserId(userId))
                .build();
        guestRepository.save(guest);
    }

    public List<Guest> setManiti(Long partyId) {
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

    public boolean isGuest(Long userId) {
        Optional<Guest> guestOptional = guestRepository.findByUser_UserId(userId);

        return guestOptional.isPresent();
    }

    public GuestRes findByGuestId(Long guestId) {
        Guest guest = guestRepository.findById(guestId).orElseThrow(() -> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));
        return toGuestRes(guest);
    }

    public List<GuestRes> getAllGuest(Long partyId) {

        List<Guest> guestList = guestRepository.findByParty_PartyId(partyId);
        List<GuestRes> guestResList = toGuestResList(guestList);
        return guestResList;
    }

    public GuestRes findManito(Long guestId) {
        Guest manito = guestRepository.findByManitiId(guestId).orElseThrow(() -> new GuestException(GuestErrorCode.MANITO_NOT_FOUND));
        return toGuestRes(manito);
    }

    //

    public GuestRes findByUserId(Long userId) {

        boolean isPartyGuest = guestRepository.findByUserId(userId).isPresent();

        if (isPartyGuest) {
            Guest guest = guestRepository.findByUserId(userId).get();
            return GuestRes.builder()
                    .guestId(guest.getGuestId())
                    .partyId(guest.getParty().getPartyId())
                    .build();
        } else {
            final Long NON_EXIST_GUEST_ID = 0L;
            final Long NON_EXIST_PARTY_ID = 0L;

            return GuestRes.builder()
                    .guestId(NON_EXIST_GUEST_ID)
                    .partyId(NON_EXIST_PARTY_ID)
                    .build();
        }
    }

    public GuestRes toGuestResWithProfile(Guest guest) {

        User user = guest.getUser();

        GuestRes res = GuestRes.builder()
                .guestId(guest.getGuestId())
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .thumbnailUrl(user.getThumbnailUrl())
                .build();

        return res;
    }

    public List<GuestRes> toGuestResWithProfileList(List<Guest> guests) {
        List<GuestRes> guestResList = new ArrayList<>();
        for (Guest guest : guests) {
            GuestRes guestRes = toGuestResWithProfile(guest);
            guestResList.add(guestRes);
        }
        return guestResList;
    }

    public GuestRes findGuestWithProfileByGuestId(Long guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));
        return toGuestResWithProfile(guest);
    }

    public List<GuestRes> findAllWithProfileByPartyId(Long partyId) {
        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));
        List<Guest> guestList = guestRepository.findAllByPartyId(partyId);
        return toGuestResWithProfileList(guestList);
    }

    //

    public GuestRes toGuestResWithProfileAndResult(Guest guest) {

        User user = guest.getUser();

        Favorability favorability = resultRepository.findFavorabilityByGuestId(guest.getGuestId())
                .map(projection ->
                    new Favorability(projection.getManitoFavorability(), projection.getManitiFavorability()))
                .orElseThrow(() -> new ResultException(ResultErrorCode.FAVORABILITY_RESULT_NOT_FOUND));

        GuestRes res = GuestRes.builder()
                .guestId(guest.getGuestId())
                .nickname(user.getNickname())
                .thumbnailUrl(user.getThumbnailUrl())
                .manatiId(guest.getManitiId())
                .votedId(guest.getVotedId())
                .favorability(favorability)
                .build();

        return res;
    }

    public PairRes toPairResWithProfile(Guest manito, Guest maniti) {

        PairRes res = PairRes.builder()
                .manito(toGuestResWithProfileAndResult(manito))
                .maniti(toGuestResWithProfileAndResult(maniti))
                .build();

        return res;
    }

    public List<PairRes> findPairsWithProfileByPartyId(Long partyId) {

        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));

        System.out.println(party);

        List<Guest> guestList = guestRepository.findAllByPartyId(partyId);

        List<PairRes> pairResList = new ArrayList<>();
        for (Guest manito : guestList) {
            Guest maniti = guestRepository.findById(manito.getManitiId())
                    .orElseThrow(() -> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));
            PairRes pairRes = toPairResWithProfile(manito, maniti);
            pairResList.add(pairRes);
        }

        return pairResList;
    }

    //

    public GuestRes toGuestRes(Guest guest) {
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
