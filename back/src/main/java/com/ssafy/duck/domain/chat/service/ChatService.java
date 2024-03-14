package com.ssafy.duck.domain.chat.service;

import com.ssafy.duck.domain.chat.entity.Chat;
import com.ssafy.duck.domain.chat.repository.ChatRepository;
import com.ssafy.duck.domain.guest.entity.Guest;
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
    private final ChatRepository chatRepository;

    public Chat create(String accessCode) {
        Chat chat = Chat.builder()
                .manitiId(null)
                .cratedTime(Instant.now())
                .party(partyRepository.findByAccessCode(accessCode)
                        .orElseThrow(() -> new PartyException(PartyErrorCode.NOT_FOUND_PARTY)))
                .build();
        chatRepository.save(chat);
        return chat;
    }

    public void setManiti(List<Guest> guests) {
        for (Guest guest : guests) {
            Chat chat = chatRepository.findByChatId(guest.getChat().getChatId());

            chatRepository.save(chat);
        }
    }

}
