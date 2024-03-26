package com.ssafy.duck.domain.chat.repository;

import com.ssafy.duck.domain.chat.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatId(Integer chatId);

    Long countByChatId(Integer chatId);

}
