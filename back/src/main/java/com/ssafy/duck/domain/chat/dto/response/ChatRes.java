package com.ssafy.duck.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ChatRes {

    private Long groupChatId;
    private Long manitoChatId;
    private Long manitiChatId;

}
