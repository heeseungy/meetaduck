package com.ssafy.duck.domain.mission.dto.request;

import lombok.Getter;

import java.time.Instant;

@Getter
public class MissionSuccessReq {
    private Long missionStatusId;
    private Boolean missionSuccessResult;
}
