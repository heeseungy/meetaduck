package com.ssafy.duck.domain.party.dto.request;

import com.ssafy.duck.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class CreateReq {

    private Long userId;
    private String partyName;

}
