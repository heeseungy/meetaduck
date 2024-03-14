package com.ssafy.duck.domain.mission.dto.response;

import lombok.*;

import java.time.Instant;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MissionResultRes {

    private Long guestId;
    private Long missionStatusId;
    private Instant getTime;
    private Instant confirmTime;
    private Instant successTime;
    private String missionContent;
    private String missionImageUrl;

}
