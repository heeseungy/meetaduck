package com.ssafy.duck.domain.party.dto.request;

import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class CreateReq {

    private String partyName;
    private Long userId;

}
