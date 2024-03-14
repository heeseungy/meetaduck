package com.ssafy.duck.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
public class UserRes {

    private Long kakaoId;
    private String nickname;
    private String profileUrl;
    private String thumbnailUrl;
}
