package com.ssafy.duck.domain.mission.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MissionSuccessReq {
    private Long missionStatusId;
    private Boolean missionSuccessResult;
}
