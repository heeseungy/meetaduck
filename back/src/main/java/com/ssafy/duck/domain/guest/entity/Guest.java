package com.ssafy.duck.domain.guest.entity;

import com.ssafy.duck.domain.chat.entity.Chat;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "`guests`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@ToString
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_id", nullable = false, updatable = false)
    private Long guestId;

    @Column(name = "maniti_id")
    private Long manitiId;


    @Column(name = "voted_id")
    private Long votedId; // 초기값 설정

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "party_id", nullable = false)
    private Party party;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chat_id", nullable = false, updatable = false)
    private Chat chat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    public void updateManiti(Long manitiId) {
        this.manitiId = manitiId;
    }

    public Long updateVotedId(Long votedId) {
        this.votedId = votedId;
        return this.votedId;
    }

    public void leaveParty(Party dummyParty) {
        this.party = dummyParty;
    }
}
