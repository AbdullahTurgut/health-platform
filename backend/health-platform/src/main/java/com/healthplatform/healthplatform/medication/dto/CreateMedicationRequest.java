package com.healthplatform.healthplatform.medication.dto;

import com.healthplatform.healthplatform.medication.model.MedicationRoute;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record CreateMedicationRequest(

        UUID diseaseId,

        @NotBlank(message = "Medication name is required")
        @Size(max = 200, message = "Medication name cannot exceed 200 characters")
        String name,

        @Size(max = 100, message = "Dosage cannot exceed 100 characters")
        String dosage,

        @Size(max = 100, message = "Frequency cannot exceed 100 characters")
        String frequency,

        MedicationRoute route,

        LocalDate startDate,

        LocalDate endDate,

        MedicationStatus status,

        @Size(max = 200, message = "Prescribed by cannot exceed 200 characters")
        String prescribedBy,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
