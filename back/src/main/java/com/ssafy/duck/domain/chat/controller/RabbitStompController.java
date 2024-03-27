package com.ssafy.duck.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RabbitStompController {

    private final RabbitTemplate template;

    @Value("${rabbitmq.exchange}")
    String CHAT_EXCHANGE_NAME;

    @Value("${rabbitmq.group.binding-key}")
    String GROUP_BINDING_KEY;

    @Value("${rabbitmq.manito.binding-key}")
    String MANITO_BINDING_KEY;

    @Value("${rabbitmq.maniti.binding-key}")
    String MANITI_BINDING_KEY;

    @MessageMapping("/group")
    public void Group(String chat) {
        log.info("Group : " + chat);
        template.convertAndSend(CHAT_EXCHANGE_NAME, GROUP_BINDING_KEY, chat);
    }

    @MessageMapping("/manito")
    public void Manito(String chat) {
        log.info("Manito : " + chat);
        template.convertAndSend(CHAT_EXCHANGE_NAME, MANITO_BINDING_KEY, chat);
    }

    @MessageMapping("/maniti")
    public void Maniti(String chat) {
        log.info("Maniti : " + chat);
        template.convertAndSend(CHAT_EXCHANGE_NAME, MANITI_BINDING_KEY, chat);
    }

}
