package com.healthplatform.healthplatform.medicaltest.dto;

import com.healthplatform.healthplatform.medicaltest.model.TestCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record UpdateMedicalTestRequest(

        UUID diseaseId,

        UUID visitId,

        @NotBlank(message = "Test name is required")
        @Size(max = 200, message = "Test name cannot exceed 200 characters")
        String name,

        @NotNull(message = "Test category is required")
        TestCategory category,

        @NotNull(message = "Test date is required")
        @PastOrPresent(message = "Test date cannot be in the future")
        Instant testDate,

        @Size(max = 200, message = "Laboratory cannot exceed 200 characters")
        String laboratory,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
