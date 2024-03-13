package com.ssafy.duck.domain.mission.controller;

import com.ssafy.duck.domain.hint.dto.response.HintStatusRes;
import com.ssafy.duck.domain.mission.dto.response.MissionResultRes;
import com.ssafy.duck.domain.mission.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {
    private final MissionService missionService;

    @GetMapping("/result/{guestId}")
    public ResponseEntity<List<List<MissionResultRes>>> getMissionResult(@PathVariable("guestId") Long guestId){
        List<List<MissionResultRes>> missionResultResList = new ArrayList<>();
        List<MissionResultRes> myResult = missionService.getMyMissionResult(guestId);
        List<MissionResultRes> manitoResult = missionService.getManitoMissionResult(guestId);

        missionResultResList.add(myResult);
        missionResultResList.add(manitoResult);

        return ResponseEntity.ok(missionResultResList);
    }


    @GetMapping("/test")
    public void getMissionTest(){
//        missionService.set(
                missionService.fetch(Instant.now().plus(3*24+5, ChronoUnit.HOURS));
//                        , 1L);
    }
}
