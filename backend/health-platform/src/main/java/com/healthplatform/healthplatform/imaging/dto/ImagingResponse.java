package com.healthplatform.healthplatform.imaging.dto;

import com.healthplatform.healthplatform.imaging.model.ImagingType;

import java.time.Instant;
import java.util.UUID;

public record ImagingResponse(

        UUID id,

        UUID diseaseId,
        String diseaseName,

        UUID visitId,
        Instant visitDate,

        UUID doctorId,
        String doctorName,

        UUID hospitalId,
        String hospitalName,

        ImagingType type,
        String bodyPart,
        Instant imagingDate,
        String report,
        String notes,

        Instant createdAt,
        Instant updatedAt

) {
}
