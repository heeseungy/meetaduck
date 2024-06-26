package com.ssafy.duck.domain.result.service;

import com.ssafy.duck.common.TimeUtil;
import com.ssafy.duck.domain.chat.repository.MessageRepository;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.repository.GuestRepository;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.mission.entity.MissionStatus;
import com.ssafy.duck.domain.mission.repository.MissionStatusRepository;
import com.ssafy.duck.domain.mission.service.MissionService;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.repository.PartyRepository;
import com.ssafy.duck.domain.party.service.PartyService;
import com.ssafy.duck.domain.result.dto.response.MissionResultRes;
import com.ssafy.duck.domain.result.dto.response.ResultRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitiRes;
import com.ssafy.duck.domain.result.dto.response.ResultWithManitoRes;
import com.ssafy.duck.domain.result.entity.Result;
import com.ssafy.duck.domain.result.exception.ResultErrorCode;
import com.ssafy.duck.domain.result.exception.ResultException;
import com.ssafy.duck.domain.result.repository.ResultRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;
    private final MessageRepository messageRepository;
    private final MissionStatusRepository missionStatusRepository;
    private final GuestRepository guestRepository;
    private final PartyService partyService;
    private final GuestService guestService;
    private final MissionService missionService;

    @Value("${fast-api.url}")
    private String fastAPIUrl;

    public ResultWithManitiRes findMeManitiResult(Long guestId) {
        GuestRes myInfo = guestService.getGuestByUserId(guestId);    // 내 정보

        // 내 결과 조회
        Result myResult = resultRepository.findByGuestGuestId(guestId);
        if (myResult == null)
            throw new ResultException(ResultErrorCode.MY_RESULT_NOT_FOUND);

        // 마니띠의 결과 조회
        Result manitiResult = resultRepository.findByGuestGuestId(myInfo.getManitiId());
        if (manitiResult == null || manitiResult.getManitoWordcount() == null)
            throw new ResultException(ResultErrorCode.MANITI_RESULT_NOT_FOUND);

        Long chatCount = messageRepository.countByChatIdAndSenderIdIsNot(myInfo.getChatId().intValue(), 1L);        // 대화 빈도 계산
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

        Long chatCount = messageRepository.countByChatIdAndSenderIdIsNot(manitoInfo.getChatId().intValue(), 1L);         // 대화 빈도 계산
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
    public JSONArray stringToJson(String str) {
        System.out.println("string To Json " + str);

        JSONArray jsonArray = new JSONArray();
        try {
            JSONParser parser = new JSONParser();
            jsonArray = (JSONArray) parser.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }


    // 내 미션 수행 반환
    // 수행한 미션 : imageUrl / 실패한 미션 : null
    public List<MissionResultRes> getMyMissionResult(Long guestId) {
        System.out.println("getMyMissionResult");

        List<MissionStatus> missionStatusList = missionStatusRepository.findByGuestGuestIdOrderByGetTime(guestId);
        List<MissionResultRes> missionResultResList = new ArrayList<>();
        // 미션을 날짜별로 확인 : 총 3개
        // day1 : missionImageUrl이 있으면 1순위, 없으면 confirmdate가 있으면서 id가 큰 순서 2순위, confirmdate가 없으면 id가 가장 작은거
        for (int i = 0; i < missionStatusList.size(); i += 3) {
            MissionResultRes.MissionResultResBuilder mrRes = MissionResultRes.builder();

            for (int j = i; j < i + 3; j++) {
                MissionStatus ms = missionStatusList.get(j);
                if (ms.getSuccessTime() != null) {
                    mrRes.missionStatusId(ms.getMissionStatusId())
                            .missionContent(ms.getMission().getMissionContent())
                            .missionImageUrl(ms.getMissionImageUrl())
                            .getTime(ms.getGetTime())
//                            .successTime(ms.getSuccessTime())
                            .confirmTime(ms.getConfirmTime());
                    break;
                } else if (ms.getConfirmTime() != null) {
                    if (mrRes.build().getMissionStatusId() == null) {
                        mrRes.missionStatusId(ms.getMissionStatusId())
                                .missionContent(ms.getMission().getMissionContent())
                                .getTime(ms.getGetTime())
//                                .successTime(ms.getSuccessTime())
                                .confirmTime(ms.getConfirmTime());
                    } else {
                        mrRes.missionStatusId(ms.getMissionStatusId() > mrRes.build().getMissionStatusId() ? ms.getMissionStatusId() : mrRes.build().getMissionStatusId())
                                .getTime(ms.getGetTime())
//                                .successTime(ms.getSuccessTime())
                                .confirmTime(ms.getConfirmTime());
                    }
                } else {
                    if (mrRes.build().getConfirmTime() != null) continue;

                    mrRes.missionStatusId(ms.getMissionStatusId())
                            .missionContent(ms.getMission().getMissionContent())
                            .getTime(ms.getGetTime())
//                            .successTime(ms.getSuccessTime())
                            .confirmTime(ms.getConfirmTime());
                    break;
                }
            }
            missionResultResList.add(mrRes.build());
        }
        return missionResultResList;
    }


    // 마니또의 미션 수행 반환
    // 수행한 미션 : imageUrl / 실패한 미션 : null
    public List<MissionResultRes> getManitoMissionResult(Long guestId) {
        GuestRes manito = guestService.findManito(guestId);         // 마니또 정보

        List<MissionStatus> missionStatusList = missionStatusRepository.findByGuestGuestIdOrderByGetTime(manito.getGuestId());
        List<MissionResultRes> missionResultResList = new ArrayList<>();

        for (int i = 0; i < missionStatusList.size(); i += 3) {
            MissionResultRes.MissionResultResBuilder mrRes = MissionResultRes.builder();

            for (int j = i; j < i + 3; j++) {
                MissionStatus ms = missionStatusList.get(j);
                if (ms.getSuccessTime() != null) {
                    mrRes.missionStatusId(ms.getMissionStatusId())
                            .missionContent(ms.getMission().getMissionContent())
                            .missionImageUrl(ms.getMissionImageUrl())
                            .getTime(ms.getGetTime())
//                            .successTime(ms.getSuccessTime())
                            .confirmTime(ms.getConfirmTime());
                    break;
                } else if (ms.getConfirmTime() != null) {
                    if (mrRes.build().getMissionStatusId() == null) {
                        mrRes.missionStatusId(ms.getMissionStatusId())
                                .missionContent(ms.getMission().getMissionContent())
                                .getTime(ms.getGetTime())
//                                .successTime(ms.getSuccessTime())
                                .confirmTime(ms.getConfirmTime());
                    } else {
                        mrRes.missionStatusId(ms.getMissionStatusId() > mrRes.build().getMissionStatusId() ? ms.getMissionStatusId() : mrRes.build().getMissionStatusId())
                                .getTime(ms.getGetTime())
//                                .successTime(ms.getSuccessTime())
                                .confirmTime(ms.getConfirmTime());
                    }
                } else {
                    if (mrRes.build().getConfirmTime() != null) continue;

                    mrRes.missionStatusId(ms.getMissionStatusId())
                            .missionContent(ms.getMission().getMissionContent())
                            .getTime(ms.getGetTime())
//                            .successTime(ms.getSuccessTime())
                            .confirmTime(ms.getConfirmTime());
                    break;
                }
            }
            missionResultResList.add(mrRes.build());
        }
//        for (MissionResultRes mrRes : missionResultResList) {
//            System.out.println(mrRes.toString());
//        }
////        for (MissionResultRes mrRes : missionResultResList) {
////            System.out.println(mrRes.toString());
////        }
//        return missionResultResList;
//    }
        return missionResultResList;
    }

    public void reserveAnalysis(Long partyId) {
        RestTemplate resultRestTemplate = new RestTemplate();
        List<Guest> guestList = guestRepository.findAllByPartyId(partyId);
        System.out.println(partyId + "번 파티 분석 시작");

        for (Guest guest : guestList) {
            System.out.println("---------------------------- reserve guestId " + guest.getGuestId());
            String sss = String.valueOf(resultRestTemplate.postForEntity(
                    fastAPIUrl + "/spark/{guestId}",
                    String.class,
                    String.class,
                    guest.getGuestId()
            ));
            System.out.println(sss);
            System.out.println("insert ");
        }
    }


    // 우호도 비율 업데이트
    public void updateResult(Long partyId){
        List<Guest> guestList = guestRepository.findAllByPartyId(partyId);
        // 파티 진행기간
        PartyRes party = partyService.findByPartyId(partyId);
        int period = TimeUtil.compareDate(party.getStartTime()+"", party.getEndTime()+"", 2 )/3-1;
        System.out.println("result update period " +period + " /3 :" + (period/3-1) );

        for (Guest guest : guestList) {
            System.out.println("---------------------------- reserve ratio guestId " + guest.getGuestId());
            // 데일리미션 성공 여부 : 100 * (1 - 미션실패개수 / 미션 총개수) * 0.4(비율)
            long missionFavorability = Math.round(100 * (period - missionService.calcMissionFailCount(guest.getGuestId())) / period * 0.4);

            // 데일리 채팅 여부 : 100 * (데일리채팅여부 / 미션 총개수) * 0.3(비율)
            int chatCount = 0;
            for (int i = 0; i < period; i++) {
                String strCreatedTime = party.getStartTime().plus(Duration.ofMinutes(i*3)).toString().substring(0, 16);
                System.out.println("createdTime " + strCreatedTime);
                Boolean isChat =messageRepository.existsByChatIdAndCreatedTimeStartingWith(guest.getChat().getChatId(), strCreatedTime);
                chatCount +=  isChat? 1 : 0;
                System.out.println("isChat " + isChat +  " chat count " + chatCount);
            }

            System.out.println(" chat " + (chatCount  ) + " " + period);
            long chatFavorability = Math.round(100* (double)chatCount / (double)period*0.3/2);

            System.out.println("mfav " + missionFavorability + " cfav " + chatFavorability);

            // 내 우호도 업데이트
            Result result = resultRepository.findByGuestGuestId(guest.getGuestId());
            System.out.println("my result " + result.getResultId());
            if(result == null)
                throw new ResultException(ResultErrorCode.MY_RESULT_NOT_FOUND);
            System.out.println(result.toString());
            result.updateManitiFavorability(result.getManitiFavorability()+(int)chatFavorability+(int)missionFavorability);
            System.out.println(result.toString());
            resultRepository.save(result);

            // 마니띠 우호도 업데이트
            Result manitiResult = resultRepository.findByGuestGuestId(guest.getManitiId());
            if(manitiResult == null)
                throw new ResultException(ResultErrorCode.MANITI_RESULT_NOT_FOUND);
            System.out.println(manitiResult.toString());
            manitiResult.updateManitoFavorability(manitiResult.getManitoFavorability()+(int)chatFavorability+(int)missionFavorability);
            System.out.println(manitiResult.toString());
            resultRepository.save(manitiResult);
        }
    }

    public ResultRes postResultAgain(Long partyId) {
        System.out.println("post result again " + partyId);
        reserveAnalysis(partyId);
        updateResult(partyId);

        // partyid로 result개수랑 partyid로 guest개수 확인해서 일치하는지 확인 -> 일치하면  true, 불일치하면 false
        int newResultCount = resultRepository.countByGuestPartyPartyId(partyId);
        int guestCount =guestService.getAllGuestByPartyId(partyId).size();

        System.out.println("result count " + newResultCount + " guestCount " + guestCount);
        if(newResultCount == guestCount)
            return ResultRes.builder().isSuccess(true).build();
        else
            return ResultRes.builder().isSuccess(false).build();
    }

    public int deleteResult(Long partyId) {
        // 파티아이디로 전체 guest id 가져오기
        List<GuestRes> guestList = guestService.getAllGuestByPartyId(partyId);
        for (GuestRes guestRes : guestList) {
            Result result = resultRepository.findByGuestGuestId(guestRes.getGuestId());
            if (result == null)
                continue;
            resultRepository.deleteById(result.getResultId());
            System.out.println("guest " + guestRes.getGuestId());
        }
        return 1;
    }
}
