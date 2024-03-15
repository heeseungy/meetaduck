package com.ssafy.duck.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MessageRes {

    private Long messageId;
    private boolean messageType;
    private String content;
    private Instant createdTime;
    private Long senderId;
    private Long chatId;

}
