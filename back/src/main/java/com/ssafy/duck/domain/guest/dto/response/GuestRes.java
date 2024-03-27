package com.ssafy.duck.domain.guest.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.duck.domain.result.dto.model.Favorability;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
public class GuestRes {

    private Long guestId;
    private Long manitiId;
    private Long votedId;
    private Long partyId;
    private Long chatId;
    private Long userId;

    // user
    private String nickname;
    private String thumbnailUrl;

    //
    private Favorability favorability;

}