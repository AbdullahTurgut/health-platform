package com.healthplatform.healthplatform.hospital.controller;

import com.healthplatform.healthplatform.hospital.dto.CreateHospitalRequest;
import com.healthplatform.healthplatform.hospital.dto.HospitalResponse;
import com.healthplatform.healthplatform.hospital.dto.UpdateHospitalRequest;
import com.healthplatform.healthplatform.hospital.service.HospitalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<HospitalResponse>> getAllHospitals(
            @RequestParam(required = false)
            String city
    ) {

        return ResponseEntity.ok(
                hospitalService.getAllHospitals(
                        city
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HospitalResponse> getHospital(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                hospitalService.getHospital(id)
        );
    }

    @PostMapping
    public ResponseEntity<HospitalResponse> createHospital(
            @Valid @RequestBody CreateHospitalRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        hospitalService.createHospital(request)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<HospitalResponse> updateHospital(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateHospitalRequest request
    ) {

        return ResponseEntity.ok(
                hospitalService.updateHospital(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(
            @PathVariable UUID id
    ) {

        hospitalService.deleteHospital(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
