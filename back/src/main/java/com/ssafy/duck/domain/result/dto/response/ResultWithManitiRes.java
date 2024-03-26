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
    private Integer favorability;
    private Integer ratio;
    private JSONArray myWordcount;
    private JSONArray wordcount;
    private Long chatCount;
    private int missionCount;
}
