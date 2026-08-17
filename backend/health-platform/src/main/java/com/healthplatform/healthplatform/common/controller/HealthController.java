package com.healthplatform.healthplatform.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public String health() {
        return "Health Platform API is running";
    }

    @GetMapping("/api/private-test")
    public String privateTest() {
        return "Private endpoint";
    }
}