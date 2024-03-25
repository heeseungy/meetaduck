package com.ssafy.duck.domain.result.service;

import com.ssafy.duck.domain.chat.repository.ChatRepository;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitiRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitoRes;
import com.ssafy.duck.domain.result.entity.Result;
import com.ssafy.duck.domain.result.exception.ResultErrorCode;
import com.ssafy.duck.domain.result.exception.ResultException;
import com.ssafy.duck.domain.result.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;
    private final ChatRepository chatRepository;
    private final GuestService guestService;
    private final GuestRepository guestRepository;
    @Value("${fast-api.url}")
    private String fastAPIUrl;

    public ResultWithManitiRes findMeManitiResult(Long guestId) {
        GuestRes myInfo = guestService.getGuestByUserId(guestId);    // 내 정보

        // 내 결과 조회
        Result myResult = resultRepository.findByGuestGuestId(guestId);
        if (myResult == null)
            throw new ResultException(ResultErrorCode.MY_RESULT_NOT_FOUND);

        // 마니띠의 결과 조회
        Result manitiResult = resultRepository.findByGuestGuestId(myInfo.getManatiId());
        if (manitiResult == null)
            throw new ResultException(ResultErrorCode.MANITI_RESULT_NOT_FOUND);

        // 대화 빈도 계산
        Long chatCount = chatRepository.countByChatId(myInfo.getChatId());

        //response 넣기
        ResultWithManitiRes resultRes = ResultWithManitiRes.builder()
                .manitiFavorability(myResult.getManitiFavorability())
                .manitiRatio(myResult.getManitiRatio())
                .myWordcount(myResult.getMantiWordcount())
                .mantiWordcount(manitiResult.getManitoWordcount())
                .chatCount(chatCount)
                .build();
        System.out.println(resultRes);

        return resultRes;
    }

    //

    public ResultWithManitoRes findMeManitoResult(Long guestId) {
        GuestRes myInfo = guestService.getGuestByUserId(guestId);    // 내 정보
        GuestRes manitoInfo = guestService.findManito(guestId);         // 마니또 정보

        // 마니또방 우호도
        // 마니또방 wordCount
        //나와 마니또의 대화 횟수
        // 마니또 기준 - 마니띠방 wordcount

        //긍정어, 부정어 사용 비율
        return null;
    }

    public void reserveAnalysis(Long partyId) {
        RestTemplate resultRestTemplate = new RestTemplate();
        List<Guest> guestList = guestRepository.findAllByPartyId(partyId);
        for (Guest guest : guestList) {
            resultRestTemplate.postForEntity(
                    fastAPIUrl + "/{guestId}",
                    String.class,
                    String.class,
                    guest.getGuestId()
            );
        }
    }
}
