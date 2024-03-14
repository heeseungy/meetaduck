package com.ssafy.duck.domain.party.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class StartReq {

    private String accessCode;
    private String endTime;
    private Long userId;

}
