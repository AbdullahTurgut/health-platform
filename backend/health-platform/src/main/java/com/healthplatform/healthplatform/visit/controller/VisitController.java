package com.healthplatform.healthplatform.visit.controller;


import com.healthplatform.healthplatform.visit.dto.CreateVisitRequest;
import com.healthplatform.healthplatform.visit.dto.UpdateVisitRequest;
import com.healthplatform.healthplatform.visit.dto.VisitResponse;
import com.healthplatform.healthplatform.visit.service.VisitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/visits")
@RequiredArgsConstructor
public class VisitController {

    private final VisitService visitService;

    @GetMapping
    public ResponseEntity<List<VisitResponse>> getAllVisits(
            @RequestParam(required = false) UUID diseaseId,
            @RequestParam(required = false) UUID doctorId,
            @RequestParam(required = false) UUID hospitalId
    ) {

        return ResponseEntity.ok(
                visitService.getAllVisits(
                        diseaseId,
                        doctorId,
                        hospitalId
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitResponse> getVisit(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                visitService.getVisit(id)
        );
    }

    @PostMapping
    public ResponseEntity<VisitResponse> createVisit(
            @Valid @RequestBody CreateVisitRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        visitService.createVisit(request)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<VisitResponse> updateVisit(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateVisitRequest request
    ) {

        return ResponseEntity.ok(
                visitService.updateVisit(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(
            @PathVariable UUID id
    ) {

        visitService.deleteVisit(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
