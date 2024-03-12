package com.ssafy.duck.domain.mission.controller;

import com.ssafy.duck.domain.mission.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {
    private final MissionService missionService;

    @GetMapping("/test")
    public void getMissionTest(){
//        missionService.set(
                missionService.fetch(Instant.now().plus(4*24+5, ChronoUnit.HOURS));
//                        , 1L);
    }
}
