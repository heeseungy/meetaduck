package com.ssafy.duck.domain.chat.entity;

import com.ssafy.duck.common.BaseTimeEntity;
import com.ssafy.duck.domain.party.entity.Party;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.annotation.Nullable;

@Entity
@Table(name = "`chats`")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Chat extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`chat_id`", nullable = false, updatable = false)
    private Long chatId;

    @Nullable
    @Column(name = "`maniti_id`", updatable = false)
    private Long manitiId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "party_id", nullable = false, updatable = false)
    private Party party;

}
