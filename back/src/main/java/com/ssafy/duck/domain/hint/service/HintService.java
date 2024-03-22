package com.ssafy.duck.domain.hint.service;

import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.hint.dto.request.HintStatusReq;
import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.dto.response.HintStatusRes;
import com.ssafy.duck.domain.hint.entity.Hint;
import com.ssafy.duck.domain.hint.entity.HintStatus;
import com.ssafy.duck.domain.hint.exception.HintErrorCode;
import com.ssafy.duck.domain.hint.exception.HintException;
import com.ssafy.duck.domain.hint.repository.HintRepository;
import com.ssafy.duck.domain.hint.repository.HintStatusRepository;
import com.ssafy.duck.domain.mission.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class HintService {

    private final HintRepository hintRepository;
    private final HintStatusRepository hintStatusRepository;
    private final GuestService guestService;
    private final MissionService missionService;

    // 힌트 질문 가져오기
    public List<HintRes> getHintQuestion(Long guestId) {
        //힌트 id 가져오기
        List<HintStatus> hintStatusList = hintStatusRepository.findAllByGuestGuestId(guestId);

        //힌트 질문 가져오기
        List<Hint> hintList = new ArrayList<>();
        for (HintStatus hs : hintStatusList) {
            Hint hint = hintRepository.findById(hs.getHint().getHintId())
                    .orElseThrow(() -> new HintException(HintErrorCode.QUESTION_NOT_FOUND));
            hintList.add(hint);
        }

        List<HintRes> hintResList = hintList.stream().map(HintRes::toDto)
                .collect(Collectors.toList());

        return hintResList;
    }

    //종료시간과 현재시간 비교해서 날짜개수만큼 랜덤으로 힌트 가져오기
    public List<Long> fetch(Instant endTime) {
        Instant current = Instant.now();

        //day 수 구하기
        int curLocalTime = LocalDateTime.ofInstant(current, ZoneId.systemDefault()).getDayOfMonth();
        int endLocalTime = LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()).getDayOfMonth();
        int period = endLocalTime - curLocalTime;
        System.out.println(curLocalTime + "/" + endLocalTime + " period " + period);

        //힌트 개수 가져오기
        long totalCount = hintRepository.count();

        List<Long> totalIndex = new ArrayList<>();
        for (long i = 1; i <= totalCount; i++) {
            totalIndex.add(i);
        }

        List<Long> selectedList = new ArrayList<>();
        for (long i = 0; i < period; i++) {
            int random = ThreadLocalRandom.current().nextInt(totalIndex.size());
            selectedList.add(totalIndex.remove(random));
        }

        System.out.println("--- hint selected " + selectedList);

        return selectedList;
    }

    // 힌트status에 질문 저장
    public void set(List<Long> indexList, Long partyId) {
        // 파티아이디로 전체 guest id 가져오기
        List<GuestRes> guestList = guestService.getAllGuest(partyId);


        System.out.println("--- hint guest List " + guestList);

        // guest 마다 hint status에 데이터 추가하기
        for (GuestRes guestRes : guestList) {
            for (Long index : indexList) {
                HintStatus hintStatus = HintStatus.builder()
                        .guest(Guest.builder().guestId(guestRes.getGuestId()).build())
                        .hint(Hint.builder().hintId(index).build())
                        .build();
                hintStatusRepository.save(hintStatus);
            }
        }
    }


    // 힌트 작성하기
    public void setStatus(Long guestId, List<HintStatusReq> hintStatusReq) {
        for (HintStatusReq req : hintStatusReq) {
            HintStatus hintStatus = hintStatusRepository.findByGuestGuestIdAndHintHintId(guestId, req.getHintId());
            if(hintStatus == null)
                throw new HintException(HintErrorCode.STATUS_NOT_FOUND);
            hintStatus.updateAnswer(hintStatus.getHintStatusId(), req.getHintStatusAnswer(), hintStatus.getHint(), hintStatus.getGuest());
            hintStatusRepository.save(hintStatus);
        }
    }

    //힌트 질문+답변 조회
    public List<HintStatusRes> getHintQnA(Long guestId) {
        GuestRes guestRes = guestService.findByGuestId(guestId);    // 내 정보
        GuestRes manito = guestService.findManito(guestId);         // 마니또 정보

        List<HintStatusRes> hintStatusResList = new ArrayList<>();
        List<HintStatus> hintStatusList = hintStatusRepository.findAllByGuestGuestId(manito.getGuestId());
        // 예상 마니또 있는지 확인
        // 없으면 mission확인하고 개수만큼 가져오기
        if (guestRes.getVotedId() == null) {
            int hintCount = missionService.calcMissionFailCount(manito.getGuestId());
            for (int i = 0; i < hintCount; i++) {
                HintStatus eachHs = hintStatusList.get(i);
                Hint hint = hintRepository.findById(eachHs.getHint().getHintId()).orElseThrow(() -> new HintException(HintErrorCode.QUESTION_NOT_FOUND));
                HintStatusRes res = HintStatusRes.builder()
                        .hintContent(hint.getHintContent())
                        .hintId(hint.getHintId())
                        .hintStatusAnswer(eachHs.getHintStatusAnswer())
                        .build();
                hintStatusResList.add(res);
            }
        }
        // 있으면 hint status 전부 가져오기
        else {
            for (HintStatus hs : hintStatusList) {
                Hint hint = hintRepository.findById(hs.getHint().getHintId()).orElseThrow(() -> new HintException(HintErrorCode.QUESTION_NOT_FOUND));
                HintStatusRes res = HintStatusRes.builder()
                        .hintContent(hint.getHintContent())
                        .hintId(hint.getHintId())
                        .hintStatusAnswer(hs.getHintStatusAnswer())
                        .build();
                hintStatusResList.add(res);
            }

        }


        return hintStatusResList;
    }


}
