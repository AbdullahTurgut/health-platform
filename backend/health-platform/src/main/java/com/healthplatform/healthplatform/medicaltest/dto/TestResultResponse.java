package com.healthplatform.healthplatform.medicaltest.dto;

import com.healthplatform.healthplatform.medicaltest.model.ResultFlag;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record TestResultResponse(

        UUID id,

        UUID medicalTestId,
        String medicalTestName,
        Instant testDate,

        String parameterName,
        String valueText,
        BigDecimal numericValue,
        String unit,
        String referenceRange,
        ResultFlag flag,
        String notes,

        Instant createdAt,
        Instant updatedAt

) {
}
