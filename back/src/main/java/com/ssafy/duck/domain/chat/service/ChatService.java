package com.ssafy.duck.domain.chat.service;

import com.ssafy.duck.common.TimeUtil;
import com.ssafy.duck.domain.chat.dto.request.MessageReq;
import com.ssafy.duck.domain.chat.dto.response.ChatRes;
import com.ssafy.duck.domain.chat.dto.response.MessageRes;
import com.ssafy.duck.domain.chat.entity.Chat;
import com.ssafy.duck.domain.chat.entity.Message;
import com.ssafy.duck.domain.chat.entity.Topic;
import com.ssafy.duck.domain.chat.exception.ChatErrorCode;
import com.ssafy.duck.domain.chat.exception.ChatException;
import com.ssafy.duck.domain.chat.repository.ChatRepository;
import com.ssafy.duck.domain.chat.repository.MessageRepository;
import com.ssafy.duck.domain.chat.repository.TopicRepository;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.exception.GuestErrorCode;
import com.ssafy.duck.domain.guest.exception.GuestException;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final RabbitTemplate template;

    private final PartyRepository partyRepository;
    private final GuestRepository guestRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final TopicRepository topicRepository;

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

    public void setManiti(Long partyId) {
        List<Guest> guests = guestRepository.findByParty_PartyId(partyId);
        for (Guest guest : guests) {
            Chat chat = chatRepository.findById(guest.getChat().getChatId())
                    .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_FOUND_CHAT));
            chat.setManiti(guest.getManitiId());
            chatRepository.save(chat);
        }
    }

    public ChatRes getChats(Long guestId) {
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

    public void sendMessage(Integer chatId, MessageReq messageReq) {
        Message message = Message.builder()
                .messageType(messageReq.isMessageType())
                .content(messageReq.getContent())
                .createdTime(TimeUtil.convertToKST(Instant.now()).toString())
                .senderId(messageReq.getSenderId())
                .chatId(chatId)
                .build();
        Message savedMessage = messageRepository.save(message);

        // exchange 이름, routing-key, 전송하고자 하는 것
        template.convertAndSend("message.exchange", "chats." + chatId + ".messages", savedMessage);
    }

//    @Scheduled(cron = "0 0 9 * * *", zone = "Asia/Seoul")
    @Scheduled(fixedDelay = 600000)
    public void sendTopic() {
        int dayOfMonth = LocalDate.now().getDayOfMonth();
        Topic topic = topicRepository.findByTopicId(Long.valueOf(dayOfMonth))
                .orElseThrow(() -> new ChatException(ChatErrorCode.NOT_FOUND_TOPIC));

        List<Chat> chats = chatRepository.findAll();
        for (Chat chat : chats) {
            MessageReq messageReq = MessageReq.builder()
                    .messageType(false)
                    .content(topic.getTopicConent())
                    .senderId(1)
                    .chatId(chat.getChatId().intValue())
                    .build();
            sendMessage(chat.getChatId().intValue(), messageReq);
        }
    }

    public List<MessageRes> getMessages(Integer chatId) {
        return toMessageResList(messageRepository.findByChatId(chatId));
    }

    private List<MessageRes> toMessageResList(List<Message> messages) {
        List<MessageRes> messageResList = new ArrayList<>();
        for (Message message : messages) {
            MessageRes messageRes = MessageRes.builder()
                    .id(message.getId())
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
