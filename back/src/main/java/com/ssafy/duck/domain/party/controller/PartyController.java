package com.ssafy.duck.domain.party.controller;

import com.ssafy.duck.domain.party.dto.request.DeleteReq;
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

    // create new party
    // start this party

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
