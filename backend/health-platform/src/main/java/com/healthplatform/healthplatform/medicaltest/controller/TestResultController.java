package com.healthplatform.healthplatform.medicaltest.controller;

import com.healthplatform.healthplatform.medicaltest.dto.CreateTestResultRequest;
import com.healthplatform.healthplatform.medicaltest.dto.TestResultResponse;
import com.healthplatform.healthplatform.medicaltest.dto.UpdateTestResultRequest;
import com.healthplatform.healthplatform.medicaltest.service.TestResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class TestResultController {

    private final TestResultService testResultService;

    @GetMapping("/api/medical-tests/{medicalTestId}/results")
    public ResponseEntity<List<TestResultResponse>> getResultsForMedicalTest(
            @PathVariable UUID medicalTestId
    ) {

        return ResponseEntity.ok(
                testResultService.getResultsForMedicalTest(
                        medicalTestId
                )
        );
    }

    @PostMapping("/api/medical-tests/{medicalTestId}/results")
    public ResponseEntity<TestResultResponse> createTestResult(
            @PathVariable UUID medicalTestId,
            @Valid @RequestBody CreateTestResultRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        testResultService.createTestResult(
                                medicalTestId,
                                request
                        )
                );
    }

    @GetMapping("/api/test-results/{id}")
    public ResponseEntity<TestResultResponse> getTestResult(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                testResultService.getTestResult(id)
        );
    }

    @PutMapping("/api/test-results/{id}")
    public ResponseEntity<TestResultResponse> updateTestResult(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTestResultRequest request
    ) {

        return ResponseEntity.ok(
                testResultService.updateTestResult(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/api/test-results/{id}")
    public ResponseEntity<Void> deleteTestResult(
            @PathVariable UUID id
    ) {

        testResultService.deleteTestResult(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/api/test-results/history")
    public ResponseEntity<List<TestResultResponse>> getParameterHistory(
            @RequestParam String parameterName
    ) {

        return ResponseEntity.ok(
                testResultService.getParameterHistory(
                        parameterName
                )
        );
    }
}
