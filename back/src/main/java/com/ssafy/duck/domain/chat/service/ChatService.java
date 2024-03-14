package com.ssafy.duck.domain.chat.service;

import com.ssafy.duck.domain.chat.dto.response.ChatRes;
import com.ssafy.duck.domain.chat.entity.Chat;
import com.ssafy.duck.domain.chat.exception.ChatErrorCode;
import com.ssafy.duck.domain.chat.exception.ChatException;
import com.ssafy.duck.domain.chat.repository.ChatRepository;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.exception.GuestErrorCode;
import com.ssafy.duck.domain.guest.exception.GuestException;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final PartyRepository partyRepository;
    private final GuestRepository guestRepository;
    private final ChatRepository chatRepository;

    public Chat createChat(String accessCode) {
        Chat chat = Chat.builder()
                .manitiId(null)
                .cratedTime(Instant.now())
                .party(partyRepository.findByAccessCode(accessCode)
                        .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY)))
                .build();
        chatRepository.save(chat);
        return chat;
    }


    public ChatRes getMyChatList(Long guestId) {
        // 그룹채팅 = partyId=partyId고 manittiId == null인 방
        // (나의)마니또채팅 = partyId=partyId고 chats.getManitiId = guest.getGuestId();
        // (나의)마니띠채팅 = partyId=partyId고 chats.getManitiId = guest.getManitiId();

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));
        Party party = partyRepository.findById(guest.getParty().getPartyId())
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));

        System.out.println(party.getPartyId());
        System.out.println(guest.getGuestId());
        System.out.println(guest.getManitiId());
        return ChatRes.builder()
                .groupChatId(chatRepository.findChatIdByPartyIdAndManitiIdCustom(party.getPartyId(), null))
                .manitoChatId(chatRepository.findChatIdByPartyIdAndManitiIdCustom(party.getPartyId(), guestId))
                .manitiChatId(chatRepository.findChatIdByPartyIdAndManitiIdCustom(party.getPartyId(), guest.getManitiId()))
                .build();
    }

//    public List<MessageRes> getMessgess(Long chatId) {
//    }
//
//    public void createMessage(Long chatId, MessageReq messageReq) {
//    }

    public void setManiti(Long partyId) {
        List<Guest> guests = guestRepository.findByParty_PartyId(partyId);
        for (Guest guest : guests) {
             Chat chat = chatRepository.findById(guest.getChat().getChatId())
                     .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_FOUND_CHAT));
             chat.updateManiti(guest.getManitiId());
             chatRepository.save(chat);
        }
    }

}
