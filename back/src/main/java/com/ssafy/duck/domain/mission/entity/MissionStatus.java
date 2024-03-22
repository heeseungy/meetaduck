package com.ssafy.duck.domain.mission.entity;

import com.ssafy.duck.domain.guest.entity.Guest;
import jakarta.persistence.*;
import lombok.*;

import javax.annotation.Nullable;
import java.time.Instant;

@Entity
@Table(name = "`mission_status`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class MissionStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`mission_status_id`", nullable = false, updatable = false)
    private Long missionStatusId;

    @Nullable
    @Column(name = "`get_time`")
    private Instant getTime;

    @Nullable
    @Column(name = "`confirm_time`")
    private Instant confirmTime;

    @Nullable
    @Column(name = "`success_time`")
    private Instant successTime;

    @Nullable
    @Column(name = "`failed_time`")
    private Instant failedTime;

    @Nullable
    @Column(name = "`mission_image_url`")
    private String missionImageUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`mission_id`", nullable = false, updatable = false)
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`guest_id`", nullable = false, updatable = false)
    private Guest guest;

}
