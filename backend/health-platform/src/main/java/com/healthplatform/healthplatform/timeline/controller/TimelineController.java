package com.healthplatform.healthplatform.timeline.controller;

import com.healthplatform.healthplatform.timeline.dto.TimelinePageResponse;
import com.healthplatform.healthplatform.timeline.model.TimelineEventType;
import com.healthplatform.healthplatform.timeline.service.TimelineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/api/timeline")
@RequiredArgsConstructor
public class TimelineController {

    private final TimelineService timelineService;

    @GetMapping
    public ResponseEntity<TimelinePageResponse> getTimeline(

            @RequestParam(required = false)
            TimelineEventType type,

            @RequestParam(required = false)
            UUID diseaseId,

            @RequestParam(required = false)
            Instant from,

            @RequestParam(required = false)
            Instant to,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "20")
            int size

    ) {

        return ResponseEntity.ok(
                timelineService.getTimeline(
                        type,
                        diseaseId,
                        from,
                        to,
                        page,
                        size
                )
        );
    }
}