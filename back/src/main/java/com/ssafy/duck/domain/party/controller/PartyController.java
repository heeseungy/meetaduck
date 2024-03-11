package com.ssafy.duck.domain.party.controller;

import com.ssafy.duck.domain.party.dto.request.CreateReq;
import com.ssafy.duck.domain.party.dto.request.DeleteReq;
import com.ssafy.duck.domain.party.dto.response.CreateRes;
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

    @GetMapping("/{accessCode}")
    @Operation(summary = "파티: 조회")
    public ResponseEntity<PartyRes> find(@PathVariable String accessCode) {
        PartyRes partyRes = partyService.find(accessCode);
        if (partyRes == null) {
            return ResponseEntity.notFound().build();   // 존재 하지 않는 파티
        }
        if (partyRes.getDeleted()) {
            return ResponseEntity.badRequest().build(); // 삭제된 파티
        }
        return ResponseEntity.ok().body(partyRes);
    }

    @PostMapping("")
    @Operation(summary = "파티: 생성")
    public ResponseEntity<CreateRes> create(@RequestBody CreateReq createReq) {
        // 정상 유저 검증 로직 향후 추가 (JWT, OAuth)
        CreateRes createRes = partyService.create(createReq);

        // 1안: 경로를 준다
//        URI location = URI.create("/api/parties/" + accessCode);
//        return ResponseEntity.created(location).build();

        // 2안: partyRes를 준다
//        PartyRes partyRes = partyService.find(accessCode);
//        return ResponseEntity.ok().body(partyRes);

        // 3안 accessCode만 준다
        return ResponseEntity.ok().body(createRes);
    }

    // @PatchMapping("")
    // @Operation(summary = "파티: 시작하기")
    // public ResponseEntity<Void> start(@RequestBody StartReq startReq) {
    //     return ResponseEntity.ok().build();
    // }

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
