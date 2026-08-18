package com.healthplatform.healthplatform.doctor.controller;

import com.healthplatform.healthplatform.doctor.dto.CreateDoctorRequest;
import com.healthplatform.healthplatform.doctor.dto.DoctorResponse;
import com.healthplatform.healthplatform.doctor.dto.UpdateDoctorRequest;
import com.healthplatform.healthplatform.doctor.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAllDoctors(
            @RequestParam(required = false)
            String specialization
    ) {

        return ResponseEntity.ok(
                doctorService.getAllDoctors(
                        specialization
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctor(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                doctorService.getDoctor(id)
        );
    }

    @PostMapping
    public ResponseEntity<DoctorResponse> createDoctor(
            @Valid @RequestBody CreateDoctorRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        doctorService.createDoctor(request)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponse> updateDoctor(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateDoctorRequest request
    ) {

        return ResponseEntity.ok(
                doctorService.updateDoctor(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(
            @PathVariable UUID id
    ) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.noContent().build();
    }
}
