package com.healthplatform.healthplatform.disease.controller;

import com.healthplatform.healthplatform.disease.dto.CreateDiseaseRequest;
import com.healthplatform.healthplatform.disease.dto.DiseaseResponse;
import com.healthplatform.healthplatform.disease.dto.UpdateDiseaseRequest;
import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import com.healthplatform.healthplatform.disease.service.DiseaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/diseases")
@RequiredArgsConstructor
public class DiseaseController {

    private final DiseaseService diseaseService;

    @GetMapping
    public ResponseEntity<List<DiseaseResponse>> getAllDiseases(
            @RequestParam(required = false) DiseaseStatus status
    ) {

        return ResponseEntity.ok(
                diseaseService.getAllDiseases(status)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiseaseResponse> getDisease(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(
                diseaseService.getDisease(id)
        );
    }

    @PostMapping
    public ResponseEntity<DiseaseResponse> createDisease(
            @Valid @RequestBody CreateDiseaseRequest request
    ) {

        DiseaseResponse response =
                diseaseService.createDisease(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiseaseResponse> updateDisease(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateDiseaseRequest request
    ) {
        return ResponseEntity.ok(
                diseaseService.updateDisease(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisease(
            @PathVariable UUID id
    ) {

        diseaseService.deleteDisease(id);

        return ResponseEntity.noContent().build();
    }
}
