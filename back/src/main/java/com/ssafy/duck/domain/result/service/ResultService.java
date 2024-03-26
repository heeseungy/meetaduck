package com.ssafy.duck.domain.result.service;

import com.ssafy.duck.domain.chat.repository.MessageRepository;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.mission.repository.MissionStatusRepository;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitiRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitoRes;
import com.ssafy.duck.domain.result.entity.Result;
import com.ssafy.duck.domain.result.exception.ResultErrorCode;
import com.ssafy.duck.domain.result.exception.ResultException;
import com.ssafy.duck.domain.result.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
    private final MessageRepository messageRepository;
    private final MissionStatusRepository missionStatusRepository;
    private final GuestRepository guestRepository;
    private final GuestService guestService;

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
        if (manitiResult == null || manitiResult.getManitoWordcount() == null)
            throw new ResultException(ResultErrorCode.MANITI_RESULT_NOT_FOUND);

        Long chatCount = messageRepository.countByChatId(myInfo.getChatId().intValue());        // 대화 빈도 계산
        int missionCount = missionStatusRepository.countByGuestGuestIdAndSuccessTimeIsNotNull(guestId); // 미션 수행 개수

        ResultWithManitiRes resultRes = ResultWithManitiRes.builder()
                .favorability(myResult.getManitiFavorability())
                .ratio(myResult.getManitiRatio())
                .myWordcount(stringToJson(myResult.getManitiWordcount()))
                .wordcount(stringToJson(manitiResult.getManitoWordcount()))
                .chatCount(chatCount)
                .missionCount(missionCount)
                .build();
        System.out.println(resultRes);

        return resultRes;
    }



    public ResultWithManitoRes findMeManitoResult(Long guestId) {
        GuestRes manitoInfo = guestService.findManito(guestId);         // 마니또 정보

        // 내 결과 조회
        Result myResult = resultRepository.findByGuestGuestId(guestId);
        if (myResult == null)
            throw new ResultException(ResultErrorCode.MY_RESULT_NOT_FOUND);

        // 마니또의 결과 조회
        Result manitoResult = resultRepository.findByGuestGuestId(manitoInfo.getGuestId());
        if (manitoResult == null || manitoResult.getManitiWordcount() == null)
            throw new ResultException(ResultErrorCode.MANITO_RESULT_NOT_FOUND);

        Long chatCount = messageRepository.countByChatId(manitoInfo.getChatId().intValue());         // 대화 빈도 계산
        int missionCount = missionStatusRepository.countByGuestGuestIdAndSuccessTimeIsNotNull(manitoInfo.getGuestId()); // 미션 수행 개수

        ResultWithManitoRes resultRes = ResultWithManitoRes.builder()
                .favorability(myResult.getManitoFavorability())
                .ratio(myResult.getManitoRatio())
                .myWordcount(stringToJson(myResult.getManitoWordcount()))
                .wordcount(stringToJson(manitoResult.getManitiWordcount()))
                .chatCount(chatCount)
                .missionCount(missionCount)
                .build();
        return resultRes;
    }


    // str은 항상 json 배열 형태로 들어옴
    public JSONArray stringToJson(String str){
        JSONArray jsonArray = new JSONArray();
        try {
            JSONParser parser = new JSONParser();
            jsonArray = (JSONArray) parser.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return jsonArray;
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
