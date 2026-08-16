package com.healthplatform.healthplatform.medicaltest.entity;

import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.medicaltest.model.TestCategory;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.visit.entity.Visit;
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

import java.time.Instant;

@Entity
@Table(name = "medical_tests")
@Getter
@Setter
@NoArgsConstructor
public class MedicalTest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id")
    private Disease disease;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id")
    private Visit visit;

    @Column(
            name = "name",
            nullable = false,
            length = 200
    )
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "category",
            nullable = false,
            length = 50
    )
    private TestCategory category;

    @Column(
            name = "test_date",
            nullable = false
    )
    private Instant testDate;

    @Column(
            name = "laboratory",
            length = 200
    )
    private String laboratory;

    @Column(
            name = "notes",
            columnDefinition = "TEXT"
    )
    private String notes;
}
