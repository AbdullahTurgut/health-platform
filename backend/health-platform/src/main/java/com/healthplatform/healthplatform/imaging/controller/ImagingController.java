package com.healthplatform.healthplatform.imaging.controller;

import com.healthplatform.healthplatform.imaging.dto.CreateImagingRequest;
import com.healthplatform.healthplatform.imaging.dto.ImagingResponse;
import com.healthplatform.healthplatform.imaging.dto.UpdateImagingRequest;
import com.healthplatform.healthplatform.imaging.model.ImagingType;
import com.healthplatform.healthplatform.imaging.service.ImagingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/imaging")
@RequiredArgsConstructor
public class ImagingController {

    private final ImagingService imagingService;

    @GetMapping
    public ResponseEntity<List<ImagingResponse>> getAllImaging(
            @RequestParam(required = false) UUID diseaseId,
            @RequestParam(required = false) UUID visitId,
            @RequestParam(required = false) UUID doctorId,
            @RequestParam(required = false) UUID hospitalId,
            @RequestParam(required = false) ImagingType type,
            @RequestParam(required = false) String bodyPart
    ) {

        return ResponseEntity.ok(
                imagingService.getAllImaging(
                        diseaseId,
                        visitId,
                        doctorId,
                        hospitalId,
                        type,
                        bodyPart
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagingResponse> getImaging(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                imagingService.getImaging(id)
        );
    }

    @PostMapping
    public ResponseEntity<ImagingResponse> createImaging(
            @Valid @RequestBody CreateImagingRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        imagingService.createImaging(request)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImagingResponse> updateImaging(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateImagingRequest request
    ) {

        return ResponseEntity.ok(
                imagingService.updateImaging(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImaging(
            @PathVariable UUID id
    ) {

        imagingService.deleteImaging(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
