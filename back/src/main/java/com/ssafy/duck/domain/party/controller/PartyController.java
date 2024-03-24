package com.ssafy.duck.domain.party.controller;

import com.ssafy.duck.domain.chat.service.ChatService;
import com.ssafy.duck.domain.guest.service.GuestService;
import com.ssafy.duck.domain.hint.service.HintService;
import com.ssafy.duck.domain.mission.service.MissionService;
import com.ssafy.duck.domain.party.dto.request.CreateReq;
import com.ssafy.duck.domain.party.dto.request.DeleteReq;
import com.ssafy.duck.domain.party.dto.request.StartReq;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.service.PartyService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

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
    public ResponseEntity<String> create(
        @RequestBody CreateReq createReq) {

        String accessCode = partyService.create(createReq.getPartyName(), createReq.getUserId());
        guestService.createGuest(accessCode, createReq.getUserId());

        return ResponseEntity.ok().body(accessCode);
    }

    @GetMapping("/{accessCode}/users/{userId}")
    @Operation(summary = "파티: 조회")
    public ResponseEntity<PartyRes> find(
            @PathVariable String accessCode,
            @PathVariable Long userId) {
        PartyRes partyRes = partyService.find(accessCode);
        // TODO: 파티가 있는데 isDeleted=true인 경우에는 if문 진입하도록 하는 엣지케이스 추가
        // TODO: 시작한 파티를 조회(가입)하려고 하는 경우
        // TODO: 없는 UserId인 경우
        if (!guestService.isGuest(userId)) {
            guestService.createGuest(accessCode, userId);   // 아직 파티가 없는 경우
        }

        return ResponseEntity.ok().body(partyRes);
    }

    @PatchMapping("")
    @Operation(summary = "파티: 시작하기")
    public ResponseEntity<PartyRes> start(
            @RequestBody StartReq startReq) {
        PartyRes partyRes = partyService.find(startReq.getAccessCode());
        if(partyRes.isValid(startReq, partyRes)) {
            partyService.start(partyRes, startReq);
            guestService.setManiti(partyRes.getPartyId());
            chatService.setManiti(partyRes.getPartyId());
            chatService.createChat(partyRes.getAccessCode());
            missionService.set(missionService.fetch(), startReq);
            hintService.set(hintService.fetch(), partyRes.getPartyId());

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("")
    @Operation(summary = "파티: 삭제")
    public ResponseEntity<Void> delete(
            @RequestBody DeleteReq deleteReq) {
        PartyRes partyRes = partyService.find(deleteReq.getAccessCode());
        if (!deleteReq.getUserId().equals(partyRes.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        partyService.delete(deleteReq.getAccessCode());

        return ResponseEntity.noContent().build();
    }

}
