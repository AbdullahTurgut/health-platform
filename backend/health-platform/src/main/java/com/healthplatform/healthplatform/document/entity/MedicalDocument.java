package com.healthplatform.healthplatform.document.entity;

import com.healthplatform.healthplatform.common.entity.BaseEntity;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.document.model.DocumentType;
import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
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
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "medical_documents")
@Getter
@Setter
@NoArgsConstructor
public class MedicalDocument extends BaseEntity {

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
    @JoinColumn(name = "medical_test_id")
    private MedicalTest medicalTest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "imaging_id")
    private Imaging imaging;

    @Column(
            name = "name",
            nullable = false,
            length = 255
    )
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "document_type",
            nullable = false,
            length = 50
    )
    private DocumentType documentType;

    @Column(
            name = "file_name",
            nullable = false,
            length = 255
    )
    private String fileName;

    @Column(
            name = "storage_key",
            nullable = false,
            length = 500
    )
    private String storageKey;

    @Column(
            name = "mime_type",
            nullable = false,
            length = 100
    )
    private String mimeType;

    @Column(
            name = "file_size",
            nullable = false
    )
    private Long fileSize;

    @CreationTimestamp
    @Column(
            name = "uploaded_at",
            nullable = false,
            updatable = false
    )
    private Instant uploadedAt;
}
