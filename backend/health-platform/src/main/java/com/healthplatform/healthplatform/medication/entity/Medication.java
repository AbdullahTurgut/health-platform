package com.healthplatform.healthplatform.medication.entity;

import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.medication.model.MedicationRoute;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import com.healthplatform.healthplatform.user.entity.User;
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

import java.time.LocalDate;

@Entity
@Table(name = "medications")
@Getter
@Setter
@NoArgsConstructor
public class Medication extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id")
    private Disease disease;

    @Column(
            name = "name",
            nullable = false,
            length = 200
    )
    private String name;

    @Column(
            name = "dosage",
            length = 100
    )
    private String dosage;

    @Column(
            name = "frequency",
            length = 100
    )
    private String frequency;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "route",
            length = 30
    )
    private MedicationRoute route;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false,
            length = 30
    )
    private MedicationStatus status = MedicationStatus.ACTIVE;

    @Column(
            name = "prescribed_by",
            length = 200
    )
    private String prescribedBy;

    @Column(
            name = "notes",
            columnDefinition = "TEXT"
    )
    private String notes;
}
