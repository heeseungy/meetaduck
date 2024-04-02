package com.ssafy.duck.domain.chat.repository;

import com.ssafy.duck.domain.chat.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatId(Integer chatId);

//    Long countByChatId(Integer chatId);
    Long countByChatIdAndSenderIdIsNot(Integer chatId, Long adminId);

    Boolean existsByChatIdAndCreatedTimeStartingWith(Long chatId, String createdTime);
//    Boolean existsByChatIdAndCreatedTimeStartingWithAndAndSenderIdIsNot(Long chatId, String createdTime, Long adminId);
}
