package com.ssafy.duck.domain.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Builder
@Getter
public class UserSignUpReq {

    private Long kakaoId;
    private String nickname;
    private String profileUrl;
    private String thumbnailUrl;
}
