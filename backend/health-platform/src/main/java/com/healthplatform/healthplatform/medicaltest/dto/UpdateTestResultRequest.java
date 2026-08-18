package com.healthplatform.healthplatform.medicaltest.dto;

import com.healthplatform.healthplatform.medicaltest.model.ResultFlag;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateTestResultRequest(

        @NotBlank(message = "Parameter name is required")
        @Size(max = 150, message = "Parameter name cannot exceed 150 characters")
        String parameterName,

        @NotBlank(message = "Value is required")
        @Size(max = 100, message = "Value cannot exceed 100 characters")
        String valueText,

        @DecimalMin(value = "-999999999999.999999")
        @DecimalMax(value = "999999999999.999999")
        BigDecimal numericValue,

        @Size(max = 50, message = "Unit cannot exceed 50 characters")
        String unit,

        @Size(max = 100, message = "Reference range cannot exceed 100 characters")
        String referenceRange,

        ResultFlag flag,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
