package com.healthplatform.healthplatform.medication.dto;

import com.healthplatform.healthplatform.medication.model.MedicationRoute;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record MedicationResponse(

        UUID id,

        UUID diseaseId,
        String diseaseName,

        String name,
        String dosage,
        String frequency,
        MedicationRoute route,

        LocalDate startDate,
        LocalDate endDate,

        MedicationStatus status,
        String prescribedBy,
        String notes,

        Instant createdAt,
        Instant updatedAt

) {
}