package com.ssafy.duck.domain.party.controller;

import com.ssafy.duck.domain.chat.service.ChatService;
import com.ssafy.duck.domain.guest.entity.Guest;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.hint.service.HintService;
import com.ssafy.duck.domain.mission.service.MissionService;
import com.ssafy.duck.domain.party.dto.request.CreateReq;
import com.ssafy.duck.domain.party.dto.request.DeleteReq;
import com.ssafy.duck.domain.party.dto.request.StartReq;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.entity.Party;
import com.ssafy.duck.domain.party.service.PartyService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;
    private final GuestService guestService;
    private final ChatService chatService;
    private final MissionService missionService;
    private final HintService hintService;

    @GetMapping("/{accessCode}/users/{userId}")
    @Operation(summary = "파티: 조회")
    public ResponseEntity<PartyRes> find(@PathVariable String accessCode, @PathVariable Long userId) {
        Party party = partyService.find(accessCode);
        PartyRes partyRes = partyService.toPartyRes(party);
        System.out.println(partyRes);
        if (partyRes == null) {
            return ResponseEntity.notFound().build();   // 존재 하지 않는 파티
        }
        if (partyRes.getDeleted()) {
            return ResponseEntity.badRequest().build(); // 삭제된 파티
        }
        if (guestService.find(userId)) {
            return ResponseEntity.ok().body(partyRes); // 이미 가입한 경우
        }
        guestService.create(accessCode, userId);
        return ResponseEntity.ok().body(partyRes);
    }

    @PostMapping("")
    @Operation(summary = "파티: 생성")
    public ResponseEntity<PartyRes> create(@RequestBody CreateReq createReq) {
        // 정상 유저 검증 로직 향후 추가 (JWT, OAuth)
        // 파티 만들고 -> 파티 만든 애를 게스트테이블에 추가 (create-> 생성, 조회에 둘다 사용)
        String accessCode = partyService.create(createReq.getPartyName(), createReq.getUserId());
        Party party = partyService.find(accessCode);

        guestService.create(accessCode, createReq.getUserId());

        PartyRes partyRes = partyService.toPartyRes(party);
        return ResponseEntity.ok().body(partyRes);
    }

     @PatchMapping("")
     @Operation(summary = "파티: 시작하기")
     public ResponseEntity<PartyRes> start(@RequestBody StartReq startReq) {
//         1. guest_id로 party.user_id 인지 검증한다
//         2. 시작시간을 null -> 현재시간으로 업데이트 한다
//         3. 종료시간을 null -> 사용자 설정시간으로 업데이트 한다

//         4. 모든 guests 테이블의 maniti_id를 업데이트 한다
//            모든 chats 테이블의 manati_id 를 업데이트 한다
//         5. 그룹채팅방을 생성한다
//         6. missionList = Collection.shuffle()
//         7. hintList=Collection.shuffle()
//         8. topicList=Collection.shuffle()
//         9. mission_status, hint_status테이블의 칼럼을 세팅한다.
         Party party = partyService.find(startReq.getAccessCode());
         PartyRes partyRes = partyService.toPartyRes(party);

         if (party.isDeleted()) return ResponseEntity.notFound().build();   // 삭제된 파티인 경우
         if (!partyRes.getUserId().equals(startReq.getUserId())) return ResponseEntity.badRequest().build();
         if (partyRes.getStartTime() != null) return ResponseEntity.noContent().build();    // 이미 한번 시작한 경우

         partyService.start(partyRes, startReq);
         chatService.updateManiti(guestService.updateManiti(partyRes.getPartyId()));
         chatService.create(partyRes.getAccessCode());
//         missionService.set(missionService.fetch(startReq.getEndTime()));
//         hintService.set(hintService.fetch(startReq.getEndTime()));
         return ResponseEntity.ok().build();

     }

    @DeleteMapping("")
    @Operation(summary = "파티: 삭제")
    public ResponseEntity<Void> delete(@RequestBody DeleteReq deleteReq) {
        Party party = partyService.find(deleteReq.getAccessCode());
        PartyRes partyRes = partyService.toPartyRes(party);
        if (!deleteReq.getUserId().equals(partyRes.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        partyService.delete(deleteReq.getAccessCode());
        return ResponseEntity.noContent().build();
    }

}
