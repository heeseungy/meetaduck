package com.ssafy.duck.domain.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import javax.annotation.Nullable;

@Entity
@Table(name = "`users`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long userId;

    @NotNull
    @Column(name = "`kakao_id`", unique = true, nullable = false, updatable = false)
    private Long kakaoId;
    private String nickname;

    @Nullable
    @Column(name = "`profile_url`")
    private String profileUrl;

    @Nullable
    @Column(name = "`thumbnail_url`")
    private String thumbnailUrl;

    @Nullable
    @Column(name = "`birthday`", length = 4)
    private String birthday;

    @Nullable
    @Column(name = "`phonenumber`", length = 20)
    private String phonenumber;

}
