package com.ssafy.duck.domain.mission.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MissionRes {
    private Long missionStatusId;
    private Instant confirmTime;
    private String missionImageUrl;
    private String missionContent;
}
