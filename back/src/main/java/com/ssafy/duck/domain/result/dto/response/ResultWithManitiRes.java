package com.ssafy.duck.domain.result.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultWithManitiRes {
    private Integer manitiFavorability;
    private Integer manitiRatio;
    private String myWordcount;
    private String mantiWordcount;
    private Long chatCount;
}
