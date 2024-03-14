package com.ssafy.duck.domain.guest.dto.response;

import lombok.*;

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

}