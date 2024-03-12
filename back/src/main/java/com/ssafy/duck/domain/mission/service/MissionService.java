package com.ssafy.duck.domain.mission.service;

import com.ssafy.duck.domain.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class MissionService {
    @Autowired
    private final MissionRepository missionRepository;

    //종료시간과 현재시간 비교해서 날짜개수만큼 랜덤으로 미션 가져오기
    public List<List<Long>> fetch(Instant endTime){
        Instant current = Instant.now();
//        System.out.println("current "+ LocalDateTime.ofInstant(current, ZoneId.systemDefault()));
//        System.out.println("endTime " +LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()));

        //day 수 구하기
        int curLocalTime = LocalDateTime.ofInstant(current, ZoneId.systemDefault()).getDayOfMonth();
        int endLocalTime = LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()).getDayOfMonth();
        int period = endLocalTime - curLocalTime;
        System.out.println(curLocalTime +"/" + endLocalTime + " period " + period);

        //미션 개수 가져오기
        long totalCount =  missionRepository.count();
        System.out.println("total count " + totalCount);

        List<Long> totalIndex = new ArrayList<>();
        for (long i = 1; i <= totalCount; i++) {
            totalIndex.add(i);
        }

        List<List<Long>> selectedList = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            List<Long> eachMissionList = new ArrayList<>();
            for (long j = 0; j < period; j++) {
                int random = ThreadLocalRandom.current().nextInt(totalIndex.size());
                eachMissionList.add(totalIndex.remove(random));
            }
            selectedList.add(eachMissionList);
        }

        System.out.println("---selected" + selectedList);

        return selectedList;
    }


}