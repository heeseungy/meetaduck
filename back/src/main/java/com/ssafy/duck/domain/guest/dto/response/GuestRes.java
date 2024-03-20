package com.ssafy.duck.domain.guest.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
public class GuestRes {

    private Long guestId;
    private Long manatiId;
    private Long votedId;
    private Long partyId;
    private Long chatId;
    private Long userId;

    // User
    private String nickname;
    private String thumbnailUrl;
}