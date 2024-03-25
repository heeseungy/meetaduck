package com.ssafy.duck.domain.mission.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;



@Getter
@AllArgsConstructor
public class MissionImageUpdateReq {
    private Long missionStatusId;
    private String missionImageUrl;
}
