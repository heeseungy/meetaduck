package com.ssafy.duck.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitConfig {

    @Value("${rabbitmq.exchange}")
    String CHAT_EXCHANGE_NAME;
    @Value("${rabbitmq.group.binding-key}")
    String GROUP_BINDING_KEY;
    @Value("${rabbitmq.manito.binding-key}")
    String MANITO_BINDING_KEY;
    @Value("${rabbitmq.maniti.binding-key}")
    String MANITI_BINDING_KEY;

    //RabbitAdmin을 사용하면 RabbitMQ 서버에 Exchange, Queue, Binding을 등록할 수 있습니다.
    //RabbitAdmin은 RabbitTemplate을 사용하여 RabbitMQ 서버에 접근합니다.
    @Bean
    public AmqpAdmin amqpAdmin() {
        RabbitAdmin rabbitAdmin = new RabbitAdmin(connectionFactory());
        rabbitAdmin.declareExchange(exchange());
        rabbitAdmin.declareQueue(groupQueue());
        rabbitAdmin.declareQueue(manitoQueue());
        rabbitAdmin.declareQueue(manitiQueue());
        rabbitAdmin.declareBinding(bindingGroup(exchange(), groupQueue()));
        rabbitAdmin.declareBinding(bindingManito(exchange(), manitoQueue()));
        rabbitAdmin.declareBinding(bindingManiti(exchange(), manitiQueue()));
        return rabbitAdmin;
    }

    //Exchange 등록
    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(CHAT_EXCHANGE_NAME);
    }

    //Queue 등록
    @Bean
    public Queue groupQueue() {
        return new Queue(GROUP_BINDING_KEY, true);
    }

    @Bean
    public Queue manitoQueue() {
        return new Queue(MANITO_BINDING_KEY, true);
    }

    @Bean
    public Queue manitiQueue() {
        return new Queue(MANITI_BINDING_KEY, true);
    }

    //Binding 등록
    @Bean
    public Binding bindingGroup(DirectExchange exchange, Queue groupQueue) {
        return BindingBuilder.bind(groupQueue).to(exchange).with(GROUP_BINDING_KEY);
    }

    @Bean
    public Binding bindingManito(DirectExchange exchange, Queue manitoQueue) {
        return BindingBuilder.bind(manitoQueue).to(exchange).with(MANITO_BINDING_KEY);
    }

    @Bean
    public Binding bindingManiti(DirectExchange exchange, Queue manitiQueue) {
        return BindingBuilder.bind(manitiQueue).to(exchange).with(MANITI_BINDING_KEY);
    }

    //RabbitTemplate을 사용하여 RabbitMQ 서버에 메시지를 전송할 수 있습니다.
    //RabbitTemplate은 RabbitMQ 서버에 접근하기 위한 클래스입니다.
    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
        template.setExchange(CHAT_EXCHANGE_NAME);
        return template;
    }

    //ConnectionFactory 등록
    //ConnectionFactory는 RabbitMQ 서버에 접근하기 위한 클래스입니다.
    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setHost("localhost");
        factory.setUsername("guest");
        factory.setPassword("guest");
        return factory;
    }

}
