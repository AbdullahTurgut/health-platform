package com.healthplatform.healthplatform.imaging.entity;

import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.doctor.entity.Doctor;
import com.healthplatform.healthplatform.hospital.entity.Hospital;
import com.healthplatform.healthplatform.imaging.model.ImagingType;
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
@Table(name = "imaging")
@Getter
@Setter
@NoArgsConstructor
public class Imaging extends BaseEntity {

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "type",
            nullable = false,
            length = 50
    )
    private ImagingType type;

    @Column(
            name = "body_part",
            length = 150
    )
    private String bodyPart;

    @Column(
            name = "imaging_date",
            nullable = false
    )
    private Instant imagingDate;

    @Column(
            name = "report",
            columnDefinition = "TEXT"
    )
    private String report;

    @Column(
            name = "notes",
            columnDefinition = "TEXT"
    )
    private String notes;
}