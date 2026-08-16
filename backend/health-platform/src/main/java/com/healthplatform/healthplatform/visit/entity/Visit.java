package com.healthplatform.healthplatform.visit.entity;

import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.doctor.entity.Doctor;
import com.healthplatform.healthplatform.hospital.entity.Hospital;
import com.healthplatform.healthplatform.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "visits")
@Getter
@Setter
@NoArgsConstructor
public class Visit extends BaseEntity {

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
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Column(
            name = "visit_date",
            nullable = false
    )
    private Instant visitDate;

    @Column(
            name = "department",
            length = 150
    )
    private String department;

    @Column(
            name = "reason",
            columnDefinition = "TEXT"
    )
    private String reason;

    @Column(
            name = "diagnosis_note",
            columnDefinition = "TEXT"
    )
    private String diagnosisNote;

    @Column(
            name = "notes",
            columnDefinition = "TEXT"
    )
    private String notes;
}
