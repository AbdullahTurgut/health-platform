package com.healthplatform.healthplatform.medication.dto;

import com.healthplatform.healthplatform.medication.model.MedicationRoute;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record CreateMedicationRequest(

        UUID diseaseId,

        @NotBlank(message = "İlaç adı zorunludur")
        @Size(max = 200, message = "İlaç adı en fazla 200 karakter olabilir")
        String name,

        @Size(max = 100, message = "Doz bilgisi en fazla 100 karakter olabilir")
        String dosage,

        @Size(max = 100, message = "Kullanım sıklığı en fazla 100 karakter olabilir")
        String frequency,

        MedicationRoute route,

        LocalDate startDate,

        LocalDate endDate,

        MedicationStatus status,

        @Size(max = 200, message = "Reçete eden bilgisi en fazla 200 karakter olabilir")
        String prescribedBy,

        @Size(max = 5000, message = "Notlar en fazla 5000 karakter olabilir")
        String notes

) {
}
