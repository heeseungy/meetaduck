package com.ssafy.duck.domain.chat.controller;

import com.ssafy.duck.domain.chat.dto.response.ChatRes;
import com.ssafy.duck.domain.chat.dto.response.MessageRes;
import com.ssafy.duck.domain.chat.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{guestId}")
    @Operation(summary = "채팅: 채팅방 목록조회")
    public ResponseEntity<ChatRes> getMyChatList(
            @PathVariable Long guestId) {
        return ResponseEntity.ok().body(chatService.getMyChatList(guestId));
    }

    @GetMapping("/{chatId}/messages")
    @Operation(summary = "채팅: 채팅: 메시지 조회")
    public ResponseEntity<List<MessageRes>> getMessages(
            @PathVariable Integer chatId) {
        return ResponseEntity.ok().body(chatService.getMessgess(chatId));
    }
//
//    @PostMapping("/{chatId}")
//    @Operation(summary = "채팅: 메시지 생성(전송)")
//    public ResponseEntity<Void> createMessage(
//            @PathVariable Long chatId,
//            @RequestBody MessageReq messageReq) {
//        chatService.createMessage(chatId, messageReq);
//        return ResponseEntity.noContent().build();
//    }

}
