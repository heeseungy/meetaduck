package com.ssafy.duck.domain.guest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class GuestRes {

    private Long guestId;
    private Long manatiId;
    private Long votedId;
    private Long partyId;
    private Long chatId;
    private Long userId;

}
