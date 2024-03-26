package com.ssafy.duck.domain.hint.controller;

import com.ssafy.duck.domain.hint.dto.request.HintStatusReq;
import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.dto.response.HintStatusRes;
import com.ssafy.duck.domain.hint.service.HintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hints")
@RequiredArgsConstructor
public class HintController {

    private final HintService hintService;

    @GetMapping("/{guestId}")
    public ResponseEntity<List<HintRes>> getHintQuestion(@PathVariable("guestId") Long guestId) {
        List<HintRes> hintResList = hintService.getHintQuestion(guestId);
        return ResponseEntity.ok(hintResList);
    }

    @PatchMapping("/{guestId}")
    public ResponseEntity<Void> setHintStatus(@PathVariable("guestId") Long guestId,
                                              @RequestBody List<HintStatusReq> hintStatusReq) {
        hintService.setStatus(guestId, hintStatusReq);
        return ResponseEntity.ok().body(null);
    }


    @GetMapping("/answers/{guestId}")
    public ResponseEntity<List<HintStatusRes>> getHintQnA(@PathVariable("guestId") Long guestId) {
        List<HintStatusRes> hintStatusResList = hintService.getHintQnA(guestId);
        return ResponseEntity.ok(hintStatusResList);
    }

}
