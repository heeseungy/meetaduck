package com.ssafy.duck.domain.hint.controller;

import com.ssafy.duck.domain.hint.dto.request.HintStatusReq;
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
        List<HintRes> hintResList = hintService.getHintQuestion(guestId);
        return ResponseEntity.ok(hintResList);
    }

    @PatchMapping("/{guestId}")
    public ResponseEntity<Void> setHintStatus(@PathVariable("guestId") Long guestId,
                                              @RequestBody List<HintStatusReq> hintStatusReq){
//        for (HintStatusReq statusReq : hintStatusReq) {
//            System.out.println(statusReq.getHintId());
//        }
        hintService.setStatus(guestId, hintStatusReq);

        return ResponseEntity.ok().body(null);
    }


//    @GetMapping("/answers/{guest_id}")
//    public ResponseEntity<List<HintStatusRes>> getHintQnA(@PathVariable("guestId") Long guestId){
//
//
//        List<HintStatusRes> hintStatusResList = hintService.
//
//        return ResponseEntity.ok(hintStatusResList);
//    }

    @GetMapping("/test")
    public void getHintTest(){
        hintService.set(
                hintService.fetch(Instant.now().plus(4*24+5, ChronoUnit.HOURS)), 1L
        );
    }



}
