package com.ssafy.duck.domain.guest.controller;

import com.ssafy.duck.domain.guest.dto.request.VoteReq;
import com.ssafy.duck.domain.guest.dto.response.VoteRes;
import com.ssafy.duck.domain.guest.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/guests")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @PatchMapping
    public ResponseEntity<VoteRes> patchVotedId(@RequestBody VoteReq voteReq) {
        VoteRes voteRes = guestService.vote(voteReq);
        return ResponseEntity.ok().body(voteRes);
    }
}
