package com.ssafy.duck.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtAuthInterceptor implements ChannelInterceptor {

    private final JwtProperties jwtProperties;

    private boolean isValidJwtToken(String jwtToken) {
        String nickname
                = JWT
                .require(Algorithm.HMAC512(jwtProperties.getSecretKey()))
                .build().verify(jwtToken)
                .getSubject();

        return nickname != null;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String jwtToken = accessor.getFirstNativeHeader("Authorization");
        if (jwtToken != null && jwtToken.startsWith("Bearer ")) {
            String token = jwtToken.substring(7);
            // 여기서 token을 검증하는 로직을 구현
             if (!isValidJwtToken(token)) { throw new JwtException(JwtErrorCode.INVALID_JWT); }
        }
        return message;
    }
}