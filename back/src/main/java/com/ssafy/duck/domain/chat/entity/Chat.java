package com.ssafy.duck.domain.chat.entity;

import com.ssafy.duck.domain.party.entity.Party;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "`chats`")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`chat_id`", nullable = false, updatable = false)
    private Long chatId;

    @Column(name = "`maniti_id`")
    private Long manitiId;

    @NotNull
    @Column(name = "`created_time`", nullable = false, updatable = false)
    private Instant cratedTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "party_id", nullable = false, updatable = false)
    private Party party;

    public void updateManiti(Long manitiId) {
        this.manitiId = manitiId;
    }
}
