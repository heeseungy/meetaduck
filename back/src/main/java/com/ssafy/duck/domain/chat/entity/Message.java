package com.ssafy.duck.domain.chat.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "messages")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Message {

    @Id
    private String id;

    @Field("message_type")
    private Boolean messageType;
    @Field("content")
    private String content;
    @Field("created_time")
    private String createdTime;
    @Field("sender_id")
    private Integer senderId;
    @Field("chat_id")
    private Integer chatId;

}
