package com.ssafy.duck.domain.user.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.duck.common.jwt.JwtProperties;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.user.dto.model.KakaoUserInfo;
import com.ssafy.duck.domain.user.dto.model.OAuthToken;
import com.ssafy.duck.domain.user.dto.request.UserSignUpReq;
import com.ssafy.duck.domain.user.dto.response.UserRes;
import com.ssafy.duck.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final JwtProperties jwtProperties;

    private final UserService userService;
    private final GuestService guestService;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectURI;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String tokenURL;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String userInfoURL;

    @GetMapping("/login")
     ResponseEntity<UserRes> login(@RequestParam("code") String code) {

        // Setting For Request Header
        Charset utf8 = Charset.forName("UTF-8");
        MediaType mediaType = new MediaType(MediaType.APPLICATION_FORM_URLENCODED, utf8);

        // Rest Template For Token
        RestTemplate tokenRestTemplate = new RestTemplate();

        // Request Headers For Token
        HttpHeaders tokenRequestHeaders = new HttpHeaders();
        tokenRequestHeaders.setContentType(mediaType);

        MultiValueMap<String, String> tokenRequestBody = new LinkedMultiValueMap<>();
        tokenRequestBody.add("grant_type", "authorization_code");
        tokenRequestBody.add("client_id", clientId);
        tokenRequestBody.add("redirect_uri", redirectURI);
        tokenRequestBody.add("code", code);

        // HTTP Request For Token
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(tokenRequestBody, tokenRequestHeaders);

        // Token Response
        ResponseEntity<String> tokenResponse = tokenRestTemplate.postForEntity(
                tokenURL,
                tokenRequest,
                String.class
        );

        // Util
        ObjectMapper objectMapper = new ObjectMapper();

        // Parse Token String to JSON
        OAuthToken oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(tokenResponse.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // Rest Template For User Info
        RestTemplate userInfoRestTemplate = new RestTemplate();

        // Request Headers For User Info
        HttpHeaders userInfoRequestHeaders = new HttpHeaders();
        userInfoRequestHeaders.setBearerAuth(oAuthToken.getAccessToken());
        userInfoRequestHeaders.setContentType(mediaType);

        // HTTP Request For User Info
        HttpEntity<MultiValueMap<String, String>> userInfoRequest = new HttpEntity<>(userInfoRequestHeaders);

        // Token Response
        ResponseEntity<String> userInfoResponse = userInfoRestTemplate.postForEntity(
                userInfoURL,
                userInfoRequest,
                String.class
        );

        //
        KakaoUserInfo userInfo = null;
        try {
            userInfo = objectMapper.readValue(userInfoResponse.getBody(), KakaoUserInfo.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        UserSignUpReq userSignUpReq = KakaoUserInfo.toUserSignUpReq(userInfo);
        UserRes userRes = null;

        Long kakaoId = userInfo.getId();
        boolean isExist = userService.isUserExistByKakaoId(kakaoId);
        if (isExist) {
            userRes = userService.findByKakaoId(kakaoId);

            GuestRes guestRes = guestService.findByUserId(userRes.getUserId());
            userRes.setPartyId(guestRes.getPartyId());
            userRes.setGuestId(guestRes.getGuestId());
        } else {
            userRes = userService.signUp(userSignUpReq);

            GuestRes guestRes = guestService.findByUserId(userRes.getUserId());
            userRes.setPartyId(guestRes.getPartyId());
            userRes.setGuestId(guestRes.getGuestId());
        }

        String jwtToken
                = JWT.create()
                .withSubject(userRes.getNickname())
                .sign(Algorithm.HMAC512(jwtProperties.getSecretKey()));

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Authorization", "Bearer " + jwtToken);

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(userRes);
    }
}
