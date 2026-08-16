package com.healthplatform.healthplatform.medicaltest.entity;

import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.medicaltest.model.ResultFlag;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "test_results")
@Getter
@Setter
@NoArgsConstructor
public class TestResult extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "medical_test_id",
            nullable = false
    )
    private MedicalTest medicalTest;

    @Column(
            name = "parameter_name",
            nullable = false,
            length = 150
    )
    private String parameterName;

    @Column(
            name = "value_text",
            nullable = false,
            length = 100
    )
    private String valueText;

    @Column(
            name = "numeric_value",
            precision = 18,
            scale = 6
    )
    private BigDecimal numericValue;

    @Column(
            name = "unit",
            length = 50
    )
    private String unit;

    @Column(
            name = "reference_range",
            length = 100
    )
    private String referenceRange;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "flag",
            length = 30
    )
    private ResultFlag flag;

    @Column(
            name = "notes",
            columnDefinition = "TEXT"
    )
    private String notes;
}
