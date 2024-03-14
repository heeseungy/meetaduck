package com.ssafy.duck.domain.user.service;

import com.ssafy.duck.domain.user.dto.request.UserSignUpReq;
import com.ssafy.duck.domain.user.dto.response.UserRes;
import com.ssafy.duck.domain.user.entity.User;
import com.ssafy.duck.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean isUserExistByKakaoId(Long kakaoId) {
        User user = userRepository.findByKakaoId(kakaoId);
        System.out.println(user);
        return user != null;
    }

    public UserRes signUp(UserSignUpReq userSignUpReq) {
        User user = User.builder()
                .kakaoId(userSignUpReq.getKakaoId())
                .nickname(userSignUpReq.getNickname())
                .profileUrl(userSignUpReq.getProfileUrl())
                .thumbnailUrl(userSignUpReq.getThumbnailUrl())
                .build();
        userRepository.save(user);
        return toUserSignUpRes(user);
    }

    public UserRes findByKakaoId(Long kakaoId) {
        User user = userRepository.findByKakaoId(kakaoId);
        return toUserSignUpRes(user);
    }

    public UserRes toUserSignUpRes(User user) {
        return UserRes.builder()
                .kakaoId(user.getKakaoId())
                .nickname(user.getNickname())
                .profileUrl(user.getProfileUrl())
                .thumbnailUrl(user.getThumbnailUrl())
                .build();
    }
}
