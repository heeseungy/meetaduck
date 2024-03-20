package com.ssafy.duck.domain.guest.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PairRes {

    GuestRes manito;
    GuestRes maniti;
}
