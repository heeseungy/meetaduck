package com.ssafy.duck.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/dummy")
    ResponseEntity<String> dummy() {
        System.out.println(ResponseEntity.ok().body("dummy"));
        return ResponseEntity.ok().body("dummy");
    }
}
