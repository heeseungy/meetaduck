package com.ssafy.duck.domain.guest.controller;

import com.ssafy.duck.domain.guest.dto.request.VoteReq;
import com.ssafy.duck.domain.guest.dto.response.GuestRes;
import com.ssafy.duck.domain.guest.dto.response.PairRes;
import com.ssafy.duck.domain.guest.dto.response.VoteRes;
import com.ssafy.duck.domain.guest.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/guests")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;

    @GetMapping("/{guestId}")
    public ResponseEntity<GuestRes> getGuestWithProfileByGuestId(@PathVariable Long guestId) {
        GuestRes guestRes = guestService.findGuestWithProfileByGuestId(guestId);
        return ResponseEntity.ok(guestRes);
    }

    @GetMapping("/all/{partyId}")
    public ResponseEntity<List<GuestRes>> getGuestListWithProfileByPartyId(@PathVariable Long partyId) {
        List<GuestRes> guestList = guestService.findAllWithProfileByPartyId(partyId);
        return ResponseEntity.ok(guestList);
    }

    @GetMapping("/maniti/{guestId}")
    public ResponseEntity<String> getManitiNickname(@PathVariable Long guestId) {
        String manitiNickname = guestService.findManitiNicknameByGuestId(guestId);
        return ResponseEntity.ok(manitiNickname);
    }

    @GetMapping("/pairs/{partyId}")
    public ResponseEntity<List<PairRes>> getPairListWithProfileByPartyId(@PathVariable Long partyId) {
        List<PairRes> pairList = guestService.findPairsWithProfileByPartyId(partyId);
        return ResponseEntity.ok(pairList);
    }

    @PatchMapping
    public ResponseEntity<VoteRes> patchVote(@RequestBody VoteReq voteReq) {
        VoteRes voteRes = guestService.vote(voteReq);
        return ResponseEntity.ok(voteRes);
    }

    @PatchMapping("/{guestId}/leave")
    public ResponseEntity<GuestRes> leave(@PathVariable Long guestId) {
        System.out.println("leave ");
        GuestRes guestRes = guestService.leave(guestId);
        return ResponseEntity.ok(guestRes);
    }

    @DeleteMapping("/{guestId}")
    public ResponseEntity<Void> deleteByGuestId(@PathVariable Long guestId) {
        guestService.deleteByGuestId(guestId);
        return ResponseEntity.ok().build();
    }
}
