package com.ssafy.duck.domain.hint.controller;

import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.dto.response.HintStatusRes;
import com.ssafy.duck.domain.hint.exception.HintException;
import com.ssafy.duck.domain.hint.service.HintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hints")
@RequiredArgsConstructor
public class HintController {

    private final HintService hintService;

    @GetMapping("/{guestId}")
    public ResponseEntity<List<HintRes>> getHintQuestion(@PathVariable("guestId") Long guestId){
        // 파티가 시작되면 랜덤 힌트 번호를 받아옴 - 수정 필요
        List<Long> indexs = new ArrayList<>();
        indexs.add(100L);
        indexs.add(300L);

        List<HintRes> hintResList = hintService.getHintQuestion(indexs);

        hintService.fetch(Instant.now().plus(4*24+5, ChronoUnit.HOURS));

        return ResponseEntity.ok(hintResList);
    }

//    @GetMapping("/answers/{guest_id}")
//    public ResponseEntity<List<HintStatusRes>> getHintQnA(@PathVariable("guestId") Long guestId){
//
//
//        List<HintStatusRes> hintStatusResList = hintService.
//
//        return ResponseEntity.ok(hintStatusResList);
//    }


}
