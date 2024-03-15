package com.ssafy.duck.domain.hint.controller;

import com.ssafy.duck.domain.hint.service.HintService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hints")
@RequiredArgsConstructor
public class HintController {

    private final HintService hintService;

//    @GetMapping("/{guestId}")
//    public ResponseEntity<?> getHintQuestion(@PathVariable("guestId") Long guestId) {
//            List<HintRes> hintResList = hintService.getHintQuestion(guestId);
//            return ResponseEntity.ok(hintResList);
//    }
//
//    @PatchMapping("/{guestId}")
//    public ResponseEntity<Void> setHintStatus(@PathVariable("guestId") Long guestId,
//                                              @RequestBody List<HintStatusReq> hintStatusReq){
////        for (HintStatusReq statusReq : hintStatusReq) {
////            System.out.println(statusReq.getHintId());
////        }
//        hintService.setStatus(guestId, hintStatusReq);
//
//        return ResponseEntity.ok().body(null);
//    }
//
//
//    @GetMapping("/answers/{guestId}")
//    public ResponseEntity<List<HintStatusRes>> getHintQnA(@PathVariable("guestId") Long guestId){
//        List<HintStatusRes> hintStatusResList = hintService.getHintQnA(guestId);
//        return ResponseEntity.ok(hintStatusResList);
//    }
//
//    @GetMapping("/test")
//    public void getHintTest(){
//        hintService.set(
//                hintService.fetch(Instant.now().plus(4*24+5, ChronoUnit.HOURS)), 1L
//        );
//    }


}
