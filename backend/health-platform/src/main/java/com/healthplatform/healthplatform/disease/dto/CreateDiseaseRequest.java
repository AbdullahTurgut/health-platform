package com.healthplatform.healthplatform.disease.dto;

import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateDiseaseRequest(

        @NotBlank(
                message = "Hastalık adı zorunludur"
        )
        @Size(
                max = 255,
                message = "Hastalık adı en fazla 255 karakter olabilir"
        )
        String name,

        @PastOrPresent(
                message = "Tanı tarihi gelecekte olamaz"
        )
        LocalDate diagnosisDate,

        DiseaseStatus status,

        @Size(
                max = 5000,
                message = "Açıklama en fazla 5000 karakter olabilir"
        )
        String description

) {
}