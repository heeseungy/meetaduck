package com.ssafy.duck.domain.result.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultWithManitoRes {
    private Integer manitoFavorability;
    private String myWordcount;
    private String mantoWordcount;
    private Integer manitoRatio;
    private Long chatCount;

}
