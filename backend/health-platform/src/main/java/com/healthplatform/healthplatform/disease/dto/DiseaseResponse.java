package com.healthplatform.healthplatform.disease.dto;

import com.healthplatform.healthplatform.disease.model.DiseaseStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record DiseaseResponse(

        UUID id,
        String name,
        LocalDate diagnosisDate,
        DiseaseStatus status,
        String description,
        Instant createdAt,
        Instant updatedAt

) {
}
