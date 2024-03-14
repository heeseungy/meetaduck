package com.ssafy.duck.domain.guest.controller;

import com.ssafy.duck.domain.guest.dto.request.VoteReq;
import com.ssafy.duck.domain.guest.dto.response.VoteRes;
import com.ssafy.duck.domain.guest.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guests")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @PatchMapping
    public ResponseEntity<VoteRes> patchVote(@RequestBody VoteReq voteReq) {
        VoteRes voteRes = guestService.vote(voteReq);
        return ResponseEntity.ok().body(voteRes);
    }

    @DeleteMapping("/{guestId}")
    public ResponseEntity<Void> deleteByGuestId(@PathVariable Long guestId) {
        guestService.deleteByGuestId(guestId);
        return ResponseEntity.ok().build();
    }
}
