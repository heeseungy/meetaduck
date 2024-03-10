package com.ssafy.duck.domain.guest.entity;

import com.ssafy.duck.domain.chat.entity.Chat;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.*;

@Entity
@Table(name = "`guests`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`guest_id`", nullable = false, updatable = false)
    private Long guestId;

    @Null
    @Column(name = "`maniti_id`")
    private Long manitiId;

    @Null
    @Column(name = "`voted_id`")
    private Long votedId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`party_id`", nullable = false, updatable = false)
    private Party party;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`chat_id`", nullable = false, updatable = false)
    private Chat chat;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`user_id`", nullable = false, updatable = false)
    private User user;

}
