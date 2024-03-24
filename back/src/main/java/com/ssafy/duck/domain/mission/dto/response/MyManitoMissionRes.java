package com.ssafy.duck.domain.mission.dto.response;

import lombok.*;

import java.time.Instant;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MyManitoMissionRes {
    private Long missionStatusId;
    private Instant confirmTime;
    private Instant successTime;
    private Instant failedTime;
    private Instant MissionImageUrl;
    private String missionContent;
}
