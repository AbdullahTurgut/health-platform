package com.healthplatform.healthplatform.medication.controller;

import com.healthplatform.healthplatform.medication.dto.CreateMedicationRequest;
import com.healthplatform.healthplatform.medication.dto.MedicationResponse;
import com.healthplatform.healthplatform.medication.dto.UpdateMedicationRequest;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import com.healthplatform.healthplatform.medication.service.MedicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/medications")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationService medicationService;

    @GetMapping
    public ResponseEntity<List<MedicationResponse>> getAllMedications(
            @RequestParam(required = false)
            UUID diseaseId,

            @RequestParam(required = false)
            MedicationStatus status,

            @RequestParam(required = false)
            String name
    ) {

        return ResponseEntity.ok(
                medicationService.getAllMedications(
                        diseaseId,
                        status,
                        name
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationResponse> getMedication(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                medicationService.getMedication(id)
        );
    }

    @PostMapping
    public ResponseEntity<MedicationResponse> createMedication(
            @Valid @RequestBody
            CreateMedicationRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        medicationService.createMedication(
                                request
                        )
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationResponse> updateMedication(
            @PathVariable UUID id,
            @Valid @RequestBody
            UpdateMedicationRequest request
    ) {

        return ResponseEntity.ok(
                medicationService.updateMedication(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(
            @PathVariable UUID id
    ) {

        medicationService.deleteMedication(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
