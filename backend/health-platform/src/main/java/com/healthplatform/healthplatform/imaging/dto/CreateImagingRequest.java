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

        @NotNull(message = "Görüntüleme türü zorunludur")
        ImagingType type,

        @Size(
                max = 150,
                message = "Vücut bölgesi en fazla 150 karakter olabilir"
        )
        String bodyPart,

        @NotNull(message = "Görüntüleme tarihi zorunludur")
        @PastOrPresent(
                message = "Görüntüleme tarihi gelecekte olamaz"
        )
        Instant imagingDate,

        @Size(
                max = 10000,
                message = "Rapor en fazla 10000 karakter olabilir"
        )
        String report,

        @Size(
                max = 5000,
                message = "Notlar en fazla 5000 karakter olabilir"
        )
        String notes

) {
}
