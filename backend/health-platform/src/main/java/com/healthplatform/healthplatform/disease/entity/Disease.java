package com.healthplatform.healthplatform.disease.entity;


import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import com.healthplatform.healthplatform.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "diseases")
@Getter
@Setter
@NoArgsConstructor
public class Disease extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @Column(
            name = "name",
            nullable = false,
            length = 255
    )
    private String name;

    @Column(name = "diagnosis_date")
    private LocalDate diagnosisDate;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false,
            length = 20
    )
    private DiseaseStatus status = DiseaseStatus.ACTIVE;

    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    private String description;
}
