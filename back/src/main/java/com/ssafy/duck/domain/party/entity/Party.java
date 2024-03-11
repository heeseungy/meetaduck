package com.ssafy.duck.domain.party.entity;

import com.ssafy.duck.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "`parties`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long partyId;

    @NotNull
    @Column(name = "access_code", length = 6, nullable = false)
    private String accessCode;

    @NotNull
    @Column(name = "`party_name`", length = 32, nullable = false, updatable = false)
    private String partyName;

    @Column(name = "`start_time`")
    private Instant startTime;

    @Column(name = "`end_time`")
    private Instant endTime;

    @NotNull
    @Column(name = "`deleted`", nullable = false)
    private boolean deleted;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`user_id`", nullable = false, updatable = false)
    private User user;

}
