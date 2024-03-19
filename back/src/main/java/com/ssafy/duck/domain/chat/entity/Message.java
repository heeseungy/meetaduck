package com.ssafy.duck.domain.chat.entity;

import com.ssafy.duck.common.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.time.LocalDateTime;

@Document(collection = "messages")
@Getter
public class Message {
    private String id;

    @Field("chat_id")
    private Integer chatId;

    @Field("content")
    private String content;
    @Field("created_time")
    private String createdTime;
    @Id
    @Field("message_id")
    private Integer messageId;
    @Field("message_type")
    private Boolean messageType;
    @Field("sender_id")
    private Integer senderId;

}
