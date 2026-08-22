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

        @NotBlank(
                message = "Test adı zorunludur"
        )
        @Size(
                max = 200,
                message = "Test adı en fazla 200 karakter olabilir"
        )
        String name,

        @NotNull(
                message = "Test kategorisi zorunludur"
        )
        TestCategory category,

        @NotNull(
                message = "Test tarihi zorunludur"
        )
        @PastOrPresent(
                message = "Test tarihi gelecekte olamaz"
        )
        Instant testDate,

        @Size(
                max = 200,
                message = "Laboratuvar adı en fazla 200 karakter olabilir"
        )
        String laboratory,

        @Size(
                max = 5000,
                message = "Notlar en fazla 5000 karakter olabilir"
        )
        String notes

) {
}
