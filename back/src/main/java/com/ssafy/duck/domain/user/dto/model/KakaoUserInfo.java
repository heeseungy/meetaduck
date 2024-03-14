package com.ssafy.duck.domain.user.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.duck.domain.user.dto.request.UserSignUpReq;
import com.ssafy.duck.domain.user.entity.User;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoUserInfo {

    Long id;

    @JsonProperty("kakao_account")
    Account account;

    @Getter
    @ToString
    @JsonIgnoreProperties(ignoreUnknown = true)
    public class Account {

        private Profile profile;
        private String email;

        @Getter
        @ToString
        @JsonIgnoreProperties(ignoreUnknown = true)
        public class Profile {

            private String nickname;
            @JsonProperty("thumbnail_image_url")
            private String thumbnailImageURL;
            @JsonProperty("profile_image_url")
            private String profileImageURL;
        }
    }

    public static UserSignUpReq toUserSignUpReq(KakaoUserInfo userInfo) {
        UserSignUpReq userSignUpReq = UserSignUpReq.builder()
                .kakaoId(userInfo.getId())
                .nickname(userInfo.getAccount().getProfile().getNickname())
                .profileUrl(userInfo.getAccount().getProfile().getProfileImageURL())
                .thumbnailUrl(userInfo.getAccount().getProfile().getThumbnailImageURL())
                .build();
        return userSignUpReq;
    }

}
