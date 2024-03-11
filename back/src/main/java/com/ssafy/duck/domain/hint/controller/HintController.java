package com.ssafy.duck.domain.hint.controller;

import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.service.HintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/hints")
@RequiredArgsConstructor
public class HintController {

    private final HintService hintService;

    @GetMapping("/{guestId}")
    public ResponseEntity<List<HintRes>> getHintQnA(@PathVariable("guestId") Long guestId) {
        List<Long> indexs = new ArrayList<>();
        indexs.add(1L);
        indexs.add(3L);
        System.out.println(guestId);

        System.out.println("aaaaaaa");

        List<HintRes> hintResList = hintService.getHintQuestion(indexs);
        for (HintRes hintRes : hintResList) {
            System.out.println(hintResList.toString());
        }


        return ResponseEntity.ok(hintResList);
    }

}
