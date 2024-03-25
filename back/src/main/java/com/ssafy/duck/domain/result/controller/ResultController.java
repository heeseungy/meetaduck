package com.ssafy.duck.domain.result.controller;

import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.result.dto.response.ResultRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitiRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitoRes;
import com.ssafy.duck.domain.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    private final GuestRepository guestRepository;

    @GetMapping("/maniti/{guestId}")
    public ResponseEntity<ResultWithManitiRes> getMeAndManitiResult(@PathVariable("guestId") Long guestId){
        ResultWithManitiRes manitiResult = resultService.findMeManitiResult(guestId);
        return ResponseEntity.ok(manitiResult);
    }

    @GetMapping("/manito/{guestId}")
    public ResponseEntity<ResultWithManitoRes> getMeAndManitoResult(@PathVariable("guestId") Long guestId){
        ResultWithManitoRes manitoResult = resultService.findMeManitoResult(guestId);

        return ResponseEntity.ok(manitoResult);
    }

    // 결과 분석 요청 TEST API (수정 및 삭제 필요)
    @GetMapping("/test/{partyId}")
    public void test(@PathVariable Long partyId) {
        resultService.reserveAnalysis(partyId);
    }
}
