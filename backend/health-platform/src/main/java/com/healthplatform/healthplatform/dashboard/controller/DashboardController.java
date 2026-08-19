package com.healthplatform.healthplatform.dashboard.controller;

import com.healthplatform.healthplatform.dashboard.dto.DashboardSummaryResponse;
import com.healthplatform.healthplatform.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {

        return ResponseEntity.ok(
                dashboardService.getSummary()
        );
    }
}
