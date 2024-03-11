package com.ssafy.duck.domain.hint.controller;

import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.service.HintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hints")
@RequiredArgsConstructor
public class HintController {

    private final HintService hintService;

    @GetMapping("/{guestId}")
    public ResponseEntity<List<HintRes>> getHintQnA(@PathVariable("guestId") Long guestId){
        // 파티가 시작되면 랜덤 힌트 번호를 받아옴 - 수정 필요
        List<Long> indexs = new ArrayList<>();
        indexs.add(1L);
        indexs.add(3L);

        List<HintRes> hintResList = hintService.getHintQuestion(indexs);

        return ResponseEntity.ok(hintResList);
    }

}
