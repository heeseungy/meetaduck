package com.ssafy.duck.domain.mission.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MissionResultRes {

    private Long guestId;
    private Long missionStatusId;
    private String missionContent;
    private String missionImageUrl;

}
