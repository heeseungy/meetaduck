package com.ssafy.duck.domain.chat.entity;

import com.ssafy.duck.common.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "`messages`")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Message extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @NotNull
    @Column(name = "`message_type`", nullable = false)
    private boolean messageType;

    @NotNull
    @Column(name = "`content`", nullable = false)
    private String content;

    @NotNull
    @Column(name = "`sender_id`", nullable = false)
    private Long senderId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chat_id", nullable = false, updatable = false)
    private Chat chat;

}
