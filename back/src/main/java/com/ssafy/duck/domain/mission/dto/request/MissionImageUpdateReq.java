package com.ssafy.duck.domain.mission.dto.request;

import lombok.Getter;



@Getter
public class MissionImageUpdateReq {
    private Long missionStatusId;
    private String missionImageUrl;
}
