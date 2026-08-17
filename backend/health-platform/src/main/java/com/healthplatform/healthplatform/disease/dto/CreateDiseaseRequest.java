package com.healthplatform.healthplatform.disease.dto;

import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateDiseaseRequest(

        @NotBlank(message = "Disease name is required")
        @Size(
                max = 255,
                message = "Disease name cannot exceed 255 characters"
        )
        String name,

        @PastOrPresent(
                message = "Diagnosis date cannot be in the future"
        )
        LocalDate diagnosisDate,

        DiseaseStatus status,

        @Size(
                max = 5000,
                message = "Description cannot exceed 5000 characters"
        )
        String description

) {
}
