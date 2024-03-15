package com.ssafy.duck.domain.chat.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MessageReq {

    private boolean messageType;
    private String content;
    private Long senderId;

}
