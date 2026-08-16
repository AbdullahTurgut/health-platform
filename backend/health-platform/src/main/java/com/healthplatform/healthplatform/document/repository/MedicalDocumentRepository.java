package com.healthplatform.healthplatform.document.repository;

import com.healthplatform.healthplatform.document.entity.MedicalDocument;
import com.healthplatform.healthplatform.document.model.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MedicalDocumentRepository
        extends JpaRepository<MedicalDocument, UUID> {

    List<MedicalDocument> findAllByUser_IdOrderByUploadedAtDesc(
            UUID userId
    );

    Optional<MedicalDocument> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<MedicalDocument> findAllByUser_IdAndDisease_IdOrderByUploadedAtDesc(
            UUID userId,
            UUID diseaseId
    );

    List<MedicalDocument> findAllByUser_IdAndVisit_IdOrderByUploadedAtDesc(
            UUID userId,
            UUID visitId
    );

    List<MedicalDocument> findAllByUser_IdAndMedicalTest_IdOrderByUploadedAtDesc(
            UUID userId,
            UUID medicalTestId
    );

    List<MedicalDocument> findAllByUser_IdAndImaging_IdOrderByUploadedAtDesc(
            UUID userId,
            UUID imagingId
    );

    List<MedicalDocument> findAllByUser_IdAndDocumentTypeOrderByUploadedAtDesc(
            UUID userId,
            DocumentType documentType
    );

    List<MedicalDocument> findAllByUser_IdAndNameContainingIgnoreCaseOrderByUploadedAtDesc(
            UUID userId,
            String name
    );
}