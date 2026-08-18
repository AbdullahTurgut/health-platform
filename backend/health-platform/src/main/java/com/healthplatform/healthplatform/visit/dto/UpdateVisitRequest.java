package com.healthplatform.healthplatform.visit.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record UpdateVisitRequest(

        UUID diseaseId,

        UUID doctorId,

        UUID hospitalId,

        @NotNull(message = "Visit date is required")
        @PastOrPresent(message = "Visit date cannot be in the future")
        Instant visitDate,

        @Size(max = 150, message = "Department cannot exceed 150 characters")
        String department,

        @Size(max = 5000, message = "Reason cannot exceed 5000 characters")
        String reason,

        @Size(max = 5000, message = "Diagnosis note cannot exceed 5000 characters")
        String diagnosisNote,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
