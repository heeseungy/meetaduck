package com.ssafy.duck.domain.party.controller;

import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.party.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/parties")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;

    @GetMapping("/{accessCode}")
    public ResponseEntity<PartyRes> findParty(@PathVariable String accessCode) {
        PartyRes partyRes = partyService.findParty(accessCode);
        if (partyRes != null) {
            return ResponseEntity.ok().body(partyRes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
