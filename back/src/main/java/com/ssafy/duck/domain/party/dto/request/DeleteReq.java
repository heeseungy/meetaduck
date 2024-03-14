package com.ssafy.duck.domain.party.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class DeleteReq {

    private String accessCode;
    private Long userId;

}
