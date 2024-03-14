package com.ssafy.duck.domain.guest.dto.request;

import lombok.Getter;

@Getter
public class VoteReq {

    private Long guestId;
    private Long votedId;
}
