package com.ssafy.duck.domain.guest.dto.response;

import com.ssafy.duck.domain.guest.entity.Guest;
import lombok.*;

import java.util.List;

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