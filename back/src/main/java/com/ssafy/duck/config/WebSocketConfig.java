package com.ssafy.duck.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 단순 MessageBroker 활성화
        // client가 메시지를 구독할 수 있는 대상: "/sub" (ex. /sub/xxx 형식으로 대상을 구독)
        registry.enableSimpleBroker("/sub");

        // 클라이언트 -> 서버, 메시지를 보낼 때 사용할 prefix를 설정
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // addEndpoint(): WebSocket 연결을 위한 endpoint를 "/ws"로 설정 -> 여기로 'Connect' 시도
        // setAllowedOrigins(): 현재 모든 출처에서 열려 있으나("*"), 향후 특정 도메인만 허용하도록 변경 필요
        registry.addEndpoint("/wss").setAllowedOrigins("*");
    }
}
