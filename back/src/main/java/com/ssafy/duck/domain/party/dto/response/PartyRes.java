package com.ssafy.duck.domain.party.dto.response;

import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PartyRes {

    private Long partyId;
    private String accessCode;
    private String partyName;
    private Instant startTime;
    private Instant endTime;
    private boolean deleted;
    private Long userId;

}
