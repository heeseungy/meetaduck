package com.ssafy.duck.config;

import com.ssafy.duck.jwt.JwtAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtAuthInterceptor jwtAuthInterceptor;
    private final RabbitProperties rabbitProperties;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/wss")    // 엔드포인트 설정
                .setAllowedOrigins("*");    // 모든 출처에서의 연결을 허용
    }

    @Value("${spring.rabbitmq.host}")
    private String mqAddress;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 아래 코드 기준
        // 구독 경로: exchange/message.exchange/chats.{chatId}.messages -> 이건 RabbitConfig 구성에 따라 변동
        // 발행 경로: pub/chats.{chatId}.messages
        registry.setPathMatcher(new AntPathMatcher(".")) // URL을 / -> .으로
                .setApplicationDestinationPrefixes("/pub")
                .setUserDestinationPrefix("/user")
                .enableStompBrokerRelay("/queue", "/topic", "/exchange","/amq/queue")
                .setRelayHost(mqAddress)
                .setVirtualHost("/")
                .setRelayPort(61613) // RabbitMQ STOMP 기본 포트
                .setSystemLogin(rabbitProperties.getUsername())
                .setSystemPasscode(rabbitProperties.getPassword())
                .setClientLogin(rabbitProperties.getUsername())
                .setClientPasscode(rabbitProperties.getPassword());
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(jwtAuthInterceptor);
    }
}
