package com.ssafy.duck.domain.result.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MissionResultRes {
//    private Long guestId;
    private Long missionStatusId;
    private Instant getTime;
    private Instant confirmTime;
//    private Instant successTime;
    private String missionContent;
    private String missionImageUrl;

}
