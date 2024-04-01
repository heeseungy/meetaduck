package com.ssafy.duck.domain.result.controller;

import com.ssafy.duck.common.TimeUtil;
import com.ssafy.duck.domain.mission.service.MissionService;
import com.ssafy.duck.domain.result.dto.response.MissionResultRes;
import com.ssafy.duck.domain.result.dto.response.ResultRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitiRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitoRes;
import com.ssafy.duck.domain.result.service.ResultService;
import com.ssafy.duck.scheduler.TaskSchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;
    private final TaskSchedulerService taskSchedulerService;

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

    @PostMapping("/{partyId}")
    public ResponseEntity<ResultRes> postPartyResult(@PathVariable("partyId") Long partyId){
        System.out.println("post result again controller ");

        ResultRes resultRes = resultService.postResultAgain(partyId);

        return ResponseEntity.ok(resultRes);
    }


    @PatchMapping("/test/{partyId}")
    public void resulttest(@PathVariable("partyId") Long partyId,   @RequestBody String endTime) {

        System.out.println("스케쥴러 타임 " + TimeUtil.convertToUTC(endTime).minus(Duration.ofMinutes(1)));
        taskSchedulerService.scheduleTask(partyId, TimeUtil.convertToUTC(endTime).minus(Duration.ofMinutes(1)) );

    }

}

