package com.healthplatform.healthplatform.visit.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public record CreateVisitRequest(

        UUID diseaseId,

        UUID doctorId,

        UUID hospitalId,

        @NotNull(
                message = "Ziyaret tarihi zorunludur"
        )
        @PastOrPresent(
                message = "Ziyaret tarihi gelecekte olamaz"
        )
        Instant visitDate,

        @Size(
                max = 150,
                message = "Bölüm adı en fazla 150 karakter olabilir"
        )
        String department,

        @Size(
                max = 5000,
                message = "Ziyaret nedeni en fazla 5000 karakter olabilir"
        )
        String reason,

        @Size(
                max = 5000,
                message = "Tanı notu en fazla 5000 karakter olabilir"
        )
        String diagnosisNote,

        @Size(
                max = 5000,
                message = "Notlar en fazla 5000 karakter olabilir"
        )
        String notes

) {
}
