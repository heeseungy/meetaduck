package com.ssafy.duck.domain.chat.controller;

import com.ssafy.duck.domain.chat.dto.response.ChatRes;
import com.ssafy.duck.domain.chat.dto.response.MessageRes;
import com.ssafy.duck.domain.chat.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{guestId}")
    @Operation(summary = "채팅: 채팅방 목록조회")
    public ResponseEntity<ChatRes> getMyChatList(
            @PathVariable Long guestId) {
        return ResponseEntity.ok().body(chatService.getChats(guestId));
    }

    @GetMapping("/{chatId}/messages")
    @Operation(summary = "채팅: 채팅: 메시지 조회")
    public ResponseEntity<List<MessageRes>> getMessages(
            @PathVariable Integer chatId) {
        return ResponseEntity.ok().body(chatService.getMessages(chatId));
    }

}
