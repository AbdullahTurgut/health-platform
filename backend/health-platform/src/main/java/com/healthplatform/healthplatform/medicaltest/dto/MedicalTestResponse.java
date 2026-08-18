package com.healthplatform.healthplatform.medicaltest.dto;

import com.healthplatform.healthplatform.medicaltest.model.TestCategory;

import java.time.Instant;
import java.util.UUID;

public record MedicalTestResponse(

        UUID id,

        UUID diseaseId,
        String diseaseName,

        UUID visitId,
        Instant visitDate,

        String name,
        TestCategory category,
        Instant testDate,
        String laboratory,
        String notes,

        Instant createdAt,
        Instant updatedAt

) {
}
