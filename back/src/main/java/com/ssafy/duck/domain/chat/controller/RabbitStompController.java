package com.ssafy.duck.domain.chat.controller;

import com.ssafy.duck.domain.chat.dto.request.MessageReq;
import com.ssafy.duck.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RabbitStompController {

    private final ChatService chatService;

    @MessageMapping("chats.{chatId}.messages")
    public void MessageHandler(
            @DestinationVariable Integer chatId, MessageReq messageReq
    ) {
        chatService.sendMessage(chatId, messageReq);
    }

}
