package com.ssafy.duck.domain.hint.dto.response;

import com.ssafy.duck.domain.hint.entity.Hint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HintRes {

    private Long hintId;
    private String hintContent;

    public static HintRes toDto(Hint hint) {
        HintRes hintRes = HintRes.builder()
                .hintId(hint.getHintId())
                .hintContent(hint.getHintContent())
                .build();
        return hintRes;
    }
}
