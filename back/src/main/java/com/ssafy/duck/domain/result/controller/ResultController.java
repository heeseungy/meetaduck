package com.ssafy.duck.domain.result.controller;

import com.ssafy.duck.domain.mission.service.MissionService;
import com.ssafy.duck.domain.result.dto.response.MissionResultRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitiRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitoRes;
import com.ssafy.duck.domain.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @GetMapping("/missions/{guestId}")
    public ResponseEntity<Map<String, List<MissionResultRes>> > getMissionResult(@PathVariable("guestId") Long guestId){
        System.out.println("getMyMissionResult controller");
        Map<String, List<MissionResultRes>> missionResultResMap = new HashMap<>();
        List<MissionResultRes> myResult = resultService.getMyMissionResult(guestId);
        List<MissionResultRes> manitoResult = resultService.getManitoMissionResult(guestId);

        missionResultResMap.put("myMission", myResult);
        missionResultResMap.put("manitoMission", manitoResult);

        return ResponseEntity.ok(missionResultResMap);
    }

    @GetMapping("/maniti/{guestId}")
    public ResponseEntity<ResultWithManitiRes> getMeAndManitiResult(@PathVariable("guestId") Long guestId) {
        ResultWithManitiRes manitiResult = resultService.findMeManitiResult(guestId);
        return ResponseEntity.ok(manitiResult);
    }

    @GetMapping("/manito/{guestId}")
    public ResponseEntity<ResultWithManitoRes> getMeAndManitoResult(@PathVariable("guestId") Long guestId) {
        ResultWithManitoRes manitoResult = resultService.findMeManitoResult(guestId);
        return ResponseEntity.ok(manitoResult);
    }

}

