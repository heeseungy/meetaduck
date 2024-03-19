package com.ssafy.duck.domain.chat.service;

import com.ssafy.duck.domain.chat.dto.response.ChatRes;
import com.ssafy.duck.domain.chat.dto.response.MessageRes;
import com.ssafy.duck.domain.chat.entity.Chat;
import com.ssafy.duck.domain.chat.entity.Message;
import com.ssafy.duck.domain.chat.exception.ChatErrorCode;
import com.ssafy.duck.domain.chat.exception.ChatException;
import com.ssafy.duck.domain.chat.repository.ChatRepository;
import com.ssafy.duck.domain.chat.repository.MessageRepository;
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
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final PartyRepository partyRepository;
    private final GuestRepository guestRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

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
        // 그룹채팅방ID = partyId=partyId고 manittiId == null인 방
        // (나의)마니또채팅방ID = partyId=partyId고 chats.getManitiId = guest.getGuestId();
        // (나의)마니띠채팅방ID = partyId=partyId고 chats.getManitiId = guest.getManitiId();

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new GuestException(GuestErrorCode.GUEST_NOT_FOUND));
        Party party = partyRepository.findById(guest.getParty().getPartyId())
                .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY));

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
            chat.setManiti(guest.getManitiId());
            chatRepository.save(chat);
        }
    }

    public List<MessageRes> getMessgess(Integer chatId) {
        return toMessageResList(messageRepository.findByChatId(chatId));
    }

    private List<MessageRes> toMessageResList(List<Message> messages) {

        // 결과를 담을 List 생성
        List<MessageRes> messageResList = new ArrayList<>();

        // 각 Message 객체를 MessageRes 객체로 변환하여 리스트에 추가
        for (Message message : messages) {
            MessageRes messageRes = MessageRes.builder()
                    .messageId(message.getMessageId())
                    .messageType(message.getMessageType())
                    .chatId(message.getChatId())
                    .content(message.getContent())
                    .createdTime(message.getCreatedTime())
                    .senderId(message.getSenderId())
                    .build();

            messageResList.add(messageRes);
        }

        return messageResList;
    }

}
