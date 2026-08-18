package com.healthplatform.healthplatform.imaging.dto;

import com.healthplatform.healthplatform.imaging.model.ImagingType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record CreateImagingRequest(

        UUID diseaseId,

        UUID visitId,

        UUID doctorId,

        UUID hospitalId,

        @NotNull(message = "Imaging type is required")
        ImagingType type,

        @Size(max = 150, message = "Body part cannot exceed 150 characters")
        String bodyPart,

        @NotNull(message = "Imaging date is required")
        @PastOrPresent(message = "Imaging date cannot be in the future")
        Instant imagingDate,

        @Size(max = 10000, message = "Report cannot exceed 10000 characters")
        String report,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
