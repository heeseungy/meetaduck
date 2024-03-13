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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static com.ssafy.duck.domain.hint.exception.HintErrorCode.QUESTION_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class HintService {
    @Autowired
    private final HintRepository hintRepository;

    @Autowired
    private final HintStatusRepository hintStatusRepository;

    @Autowired
    private GuestService guestService;

    // 힌트 질문 가져오기
    public List<HintRes> getHintQuestion(Long guestId){
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
    public List<Long> fetch(Instant endTime){
        Instant current = Instant.now();
//        System.out.println("current "+ LocalDateTime.ofInstant(current, ZoneId.systemDefault()));
//        System.out.println("endTime " +LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()));

        //day 수 구하기
        int curLocalTime = LocalDateTime.ofInstant(current, ZoneId.systemDefault()).getDayOfMonth();
        int endLocalTime = LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()).getDayOfMonth();
        int period = endLocalTime - curLocalTime;
        System.out.println(curLocalTime +"/" + endLocalTime + " period " + period);

        //힌트 개수 가져오기
        long totalCount =  hintRepository.count();
//        System.out.println("total count " + totalCount);

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
    public void set(List<Long> indexList, Long partyId){
        // 파티아이디로 전체 guest id 가져오기
        List<GuestRes> guestList = guestService.getAllGuest(partyId);


        System.out.println("--- hint guest List " + guestList);

        // guest 마다 hint status에 데이터 추가하기
        for (GuestRes guestRes : guestList) {
            for (Long index : indexList) {
//                System.out.println("index " + index);
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
            hintStatus.updateAnswer(hintStatus.getHintStatusId(), req.getHintStatusAnswer(), hintStatus.getHint(), hintStatus.getGuest());
//            System.out.println(req.getHintId() + " / " +hintStatus.getHintStatusId());
            hintStatusRepository.save(hintStatus);
        }
    }

    //힌트 질문+답변 조회
    public List<HintStatusRes> getHintQnA(Long guestId){
        // 내 정보
        GuestRes guestRes = guestService.findByGuestId(guestId);
        System.out.println("my " + guestRes.toString());

        //마니또 정보
        GuestRes manito = guestService.findManito(guestId);
        System.out.println("manito " +manito.toString());

        // 예상 마니또 있는지 확인

        // 있으면 hint status 전부 가져오기
        // 없으면 mission확인하고 개수만큼 가져오기

        List<HintStatusRes> hintStatusResList = new ArrayList<>();

        return hintStatusResList;
    }


}
