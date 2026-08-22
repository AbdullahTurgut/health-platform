package com.healthplatform.healthplatform.medicaltest.dto;

import com.healthplatform.healthplatform.medicaltest.model.ResultFlag;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateTestResultRequest(

        @NotBlank(message = "Parametre adı zorunludur")
        @Size(
                max = 150,
                message = "Parametre adı en fazla 150 karakter olabilir"
        )
        String parameterName,

        @NotBlank(message = "Değer zorunludur")
        @Size(
                max = 100,
                message = "Değer en fazla 100 karakter olabilir"
        )
        String valueText,

        @DecimalMin(
                value = "-999999999999.999999",
                message = "Sayısal değer izin verilen minimum değerin altında"
        )
        @DecimalMax(
                value = "999999999999.999999",
                message = "Sayısal değer izin verilen maksimum değerin üzerinde"
        )
        BigDecimal numericValue,

        @Size(
                max = 50,
                message = "Birim en fazla 50 karakter olabilir"
        )
        String unit,

        @Size(
                max = 100,
                message = "Referans aralığı en fazla 100 karakter olabilir"
        )
        String referenceRange,

        ResultFlag flag,

        @Size(
                max = 5000,
                message = "Notlar en fazla 5000 karakter olabilir"
        )
        String notes

) {
}
