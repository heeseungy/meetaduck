package com.ssafy.duck.domain.party.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class StartReq {

    private String accessCode;
    private Instant endTime;
    private Long userId;

}
