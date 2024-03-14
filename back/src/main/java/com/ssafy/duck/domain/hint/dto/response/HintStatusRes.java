package com.ssafy.duck.domain.hint.dto.response;

import com.ssafy.duck.domain.hint.entity.HintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HintStatusRes {
    private Long hintId;
    private String hintContent;

    private String hintStatusAnswer;

    public static HintStatusRes toDto(HintStatus hintStatus) {
        HintStatusRes hintStatusRes = HintStatusRes.builder()
                .hintId(hintStatus.getHint().getHintId())
                .hintContent(hintStatus.getHint().getHintContent())
                .hintStatusAnswer(hintStatus.getHintStatusAnswer())
                .build();
        return hintStatusRes;
    }

}
