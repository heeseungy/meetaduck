package com.ssafy.duck.domain.result.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.simple.JSONArray;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultWithManitiRes {
    private Integer manitiFavorability;
    private Integer manitiRatio;
    private JSONArray myWordcount;
    private JSONArray mantiWordcount;
    private Long chatCount;
}
