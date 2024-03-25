package com.ssafy.duck.domain.mission.controller;


import com.ssafy.duck.domain.mission.dto.request.MissionImageUpdateReq;
import com.ssafy.duck.domain.mission.dto.request.MissionPassReq;
import com.ssafy.duck.domain.mission.dto.request.MissionSuccessReq;
import com.ssafy.duck.domain.mission.dto.response.MissionRes;
import com.ssafy.duck.domain.mission.dto.response.MyManitoMissionRes;
import com.ssafy.duck.domain.mission.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    @GetMapping("/{guestId}")
    public ResponseEntity<List<MissionRes>> getTodayMissions(@PathVariable Long guestId){
        List<MissionRes> todayMissionList = missionService.findTodayMissionsByGuestId(guestId);
        return ResponseEntity.ok(todayMissionList);
    }

    @PatchMapping("/pass")
    public ResponseEntity<Void> updateConfirmTime(@RequestBody MissionPassReq missionPassReq){
        missionService.updateConfirmTimeByMissionStatusId(missionPassReq);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update")
    public ResponseEntity<Void> updateMissionImageUrl(@RequestBody MissionImageUpdateReq missionImageUpdateReq){
        missionService.updateMissionImageUrlByMissionStatusId(missionImageUpdateReq);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/mymanito/{guestId}")
    public ResponseEntity<MyManitoMissionRes> getMissionResults(@PathVariable Long guestId){
        MyManitoMissionRes  myManitoMission = missionService.findMissionResultsByGuestId(guestId);
        return ResponseEntity.ok(myManitoMission);
    }


    @PatchMapping("/success")
    public ResponseEntity<Void> updateSuccessTime(@RequestBody MissionSuccessReq missionSuccessReq){
        missionService.updateSuccessTime(missionSuccessReq);
        return ResponseEntity.ok().build();
    }

}
