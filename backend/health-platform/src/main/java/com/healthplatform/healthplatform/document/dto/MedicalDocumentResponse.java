package com.healthplatform.healthplatform.document.dto;

import com.healthplatform.healthplatform.document.model.DocumentType;

import java.time.Instant;
import java.util.UUID;

public record MedicalDocumentResponse(

        UUID id,

        UUID diseaseId,
        String diseaseName,

        UUID visitId,
        Instant visitDate,

        UUID medicalTestId,
        String medicalTestName,

        UUID imagingId,
        String imagingType,

        String name,
        DocumentType documentType,

        String fileName,
        String mimeType,
        Long fileSize,

        Instant uploadedAt,
        Instant createdAt,
        Instant updatedAt

) {
}
