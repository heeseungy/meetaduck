package com.ssafy.duck.domain.user.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRes {

    private Long userId;
    private Long kakaoId;
    private String nickname;
    private String profileUrl;
    private String thumbnailUrl;

    //
    private Long partyId;
    private Long guestId;
}
