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
    public ResponseEntity<PartyRes> create(
            @RequestBody CreateReq createReq) {
        if (partyService.isValidCreateReq(createReq.getUserId())) {
            String accessCode = partyService.create(createReq.getPartyName(), createReq.getUserId());
            guestService.createGuest(accessCode, createReq.getUserId());
            PartyRes partyRes = partyService.find(accessCode);

            return ResponseEntity.ok().body(partyRes);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{accessCode}/users/{userId}")
    @Operation(summary = "파티: 조회")
    public ResponseEntity<PartyRes> find(
            @PathVariable String accessCode,
            @PathVariable Long userId) {
        PartyRes partyRes = partyService.find(accessCode);
        if (partyService.isValidJoinReq(partyRes, userId)) {
            guestService.createGuest(accessCode, userId);

            return ResponseEntity.ok().body(partyRes);
        }

        return ResponseEntity.badRequest().build();
    }

    @PatchMapping("")
    @Operation(summary = "파티: 시작하기")
    public ResponseEntity<PartyRes> start(
            @RequestBody StartReq startReq) {
        PartyRes partyRes = partyService.find(startReq.getAccessCode());
        if (partyService.isValidStartReq(startReq, partyRes)) {
            partyService.start(partyRes, startReq);
            guestService.setManiti(partyRes.getPartyId());
            chatService.setManiti(partyRes.getPartyId());
            chatService.sendMessage(partyRes.getAccessCode());
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
        if (partyService.isValidDeleteReq(partyRes, deleteReq)) {
            partyService.delete(deleteReq.getAccessCode());

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().build();
    }

}
