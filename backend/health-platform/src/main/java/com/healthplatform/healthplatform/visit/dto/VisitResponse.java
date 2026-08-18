package com.healthplatform.healthplatform.visit.dto;

import java.time.Instant;
import java.util.UUID;

public record VisitResponse(

        UUID id,

        UUID diseaseId,
        String diseaseName,

        UUID doctorId,
        String doctorName,

        UUID hospitalId,
        String hospitalName,

        Instant visitDate,
        String department,
        String reason,
        String diagnosisNote,
        String notes,

        Instant createdAt,
        Instant updatedAt

) {
}
