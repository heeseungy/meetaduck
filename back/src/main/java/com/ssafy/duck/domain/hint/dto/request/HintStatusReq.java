package com.ssafy.duck.domain.hint.dto.request;

import com.ssafy.duck.domain.hint.entity.Hint;
import com.ssafy.duck.domain.hint.entity.HintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HintStatusReq {

    private Long hintId;
    private String hintStatusAnswer;

    public static HintStatus toEntity(HintStatusReq hintStatusReq) {
        HintStatus hintStatus = HintStatus.builder()
                .hint(Hint.builder().hintId(hintStatusReq.getHintId()).build())
                .hintStatusAnswer(hintStatusReq.getHintStatusAnswer())
                .build();
        return hintStatus;
    }

}
