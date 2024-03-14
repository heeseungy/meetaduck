package com.ssafy.duck.domain.guest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class GuestController {


    @GetMapping("health_check")
    public String healthCheck(){
        return "ok";
    }
}
