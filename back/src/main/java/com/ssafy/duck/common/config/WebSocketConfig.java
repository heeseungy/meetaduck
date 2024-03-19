package com.ssafy.duck.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 메시지 브로커 -> 클라이언트, 메시지를 전달할 때 사용할 prefix를 설정
        // "/topic"을 사용해 구독(pub/sub) 메커니즘을 위한 prefix로 설정
        config.enableSimpleBroker("/topic");

        // 클라이언트 -> 서버, 메시지를 보낼 때 사용할 prefix를 설정
        // "/app"으로 시작하는 목적지를 가진 메시지는 @Controller의 @MessageMapping으로 라우팅됩니다.
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket 연결을 위한 endpoint를 "/ws"로 설정합니다.
        // 클라이언트는 이 endpoint를 통해 WebSocket 연결을 시도할 수 있습니다.
        registry.addEndpoint("/ws").setAllowedOrigins("*");
    }
}
