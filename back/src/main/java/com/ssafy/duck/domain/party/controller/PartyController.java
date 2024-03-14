package com.ssafy.duck.domain.party.controller;

import com.ssafy.duck.domain.chat.service.ChatService;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.hint.service.HintService;
import com.ssafy.duck.domain.mission.service.MissionService;
import com.ssafy.duck.domain.party.dto.request.CreateReq;
import com.ssafy.duck.domain.party.dto.request.DeleteReq;
import com.ssafy.duck.domain.party.dto.request.StartReq;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.exception.PartyErrorCode;
import com.ssafy.duck.domain.party.exception.PartyException;
import com.ssafy.duck.domain.party.service.PartyService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;
    private final GuestService guestService;
    private final ChatService chatService;
    private final MissionService missionService;
    private final HintService hintService;

    @PostMapping("")
    @Operation(summary = "파티: 생성")
    public ResponseEntity<PartyRes> create(@RequestBody CreateReq createReq) {
        // TODO: 정상 유저 검증 로직 향후 추가
        if (guestService.isGuest(createReq.getUserId())) {
            throw new PartyException(PartyErrorCode.MAXIMUM_OF_1_PARTY_ALLOWED);
        }
        else {
            String accessCode = partyService.create(createReq.getPartyName(), createReq.getUserId());
            guestService.createGuest(accessCode, createReq.getUserId());

        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{accessCode}/users/{userId}")
    @Operation(summary = "파티: 조회")
    public ResponseEntity<PartyRes> find(@PathVariable String accessCode, @PathVariable Long userId) {
        PartyRes partyRes = partyService.find(accessCode);
        if (!guestService.isGuest(userId)) {
            guestService.createGuest(accessCode, userId);   // 아직 파티가 없는 경우
        }

        return ResponseEntity.ok().body(partyRes);
    }

    @PatchMapping("")
    @Operation(summary = "파티: 시작하기")
    public ResponseEntity<PartyRes> start(@RequestBody StartReq startReq) {
        PartyRes partyRes = partyService.find(startReq.getAccessCode());
        partyService.start(partyRes, startReq);
        chatService.setManiti(guestService.setManiti(partyRes.getPartyId()));
        chatService.create(partyRes.getAccessCode());
        missionService.set(missionService.fetch(startReq.getEndTime()), partyRes.getPartyId());
        hintService.set(hintService.fetch(startReq.getEndTime()), partyRes.getPartyId());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("")
    @Operation(summary = "파티: 삭제")
    public ResponseEntity<Void> delete(@RequestBody DeleteReq deleteReq) {
        PartyRes partyRes = partyService.find(deleteReq.getAccessCode());
        if (!deleteReq.getUserId().equals(partyRes.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        partyService.delete(deleteReq.getAccessCode());

        return ResponseEntity.noContent().build();
    }

}
