package com.ssafy.duck.domain.party.entity;

import com.ssafy.duck.common.TimeUtil;
import com.ssafy.duck.domain.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Duration;
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

    public void delete() {
        this.deleted = true;
    }

    public void start(Instant endTime) {
        this.startTime = TimeUtil.convertToKST(Instant.now());
//        this.startTime = TimeUtil.convertToKST(TimeUtil.stringToInstant("2024-03-25T20:23:00.123456789Z"));

        //날짜 변환해서 그만큼 분 더하기
        System.out.println("start start start start ");
        int days = TimeUtil.calcDate(TimeUtil.convertToKST(Instant.now())+"", TimeUtil.convertToKST(TimeUtil.stringToInstant(endTime.toString()))+"" )+1;
        System.out.println("days " +days);
        Instant newEndTime = Instant.now().plus(Duration.ofMinutes(3*days));
        System.out.println("newEndTime " + newEndTime);
        System.out.println("newEndTime to KST " + TimeUtil.convertToKST(newEndTime));
        System.out.println("---------------------------------+-+-+-+-");

//        this.endTime = TimeUtil.convertToKST(TimeUtil.stringToInstant(endTime.toString()));
        this.endTime = TimeUtil.convertToKST(newEndTime);
    }

}
