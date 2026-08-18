package com.healthplatform.healthplatform.medicaltest.controller;

import com.healthplatform.healthplatform.medicaltest.dto.CreateMedicalTestRequest;
import com.healthplatform.healthplatform.medicaltest.dto.MedicalTestResponse;
import com.healthplatform.healthplatform.medicaltest.dto.UpdateMedicalTestRequest;
import com.healthplatform.healthplatform.medicaltest.model.TestCategory;
import com.healthplatform.healthplatform.medicaltest.service.MedicalTestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/medical-tests")
@RequiredArgsConstructor
public class MedicalTestController {

    private final MedicalTestService medicalTestService;

    @GetMapping
    public ResponseEntity<List<MedicalTestResponse>> getAllMedicalTests(
            @RequestParam(required = false) UUID diseaseId,
            @RequestParam(required = false) UUID visitId,
            @RequestParam(required = false) TestCategory category
    ) {

        return ResponseEntity.ok(
                medicalTestService.getAllMedicalTests(
                        diseaseId,
                        visitId,
                        category
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalTestResponse> getMedicalTest(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                medicalTestService.getMedicalTest(id)
        );
    }

    @PostMapping
    public ResponseEntity<MedicalTestResponse> createMedicalTest(
            @Valid @RequestBody CreateMedicalTestRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        medicalTestService.createMedicalTest(
                                request
                        )
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalTestResponse> updateMedicalTest(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateMedicalTestRequest request
    ) {

        return ResponseEntity.ok(
                medicalTestService.updateMedicalTest(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalTest(
            @PathVariable UUID id
    ) {

        medicalTestService.deleteMedicalTest(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
