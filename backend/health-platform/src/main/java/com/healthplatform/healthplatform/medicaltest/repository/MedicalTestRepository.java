package com.healthplatform.healthplatform.medicaltest.repository;

import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.model.TestCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MedicalTestRepository
        extends JpaRepository<MedicalTest, UUID> {

    long countByUser_Id(
            UUID userId
    );

    List<MedicalTest> findAllByUser_IdOrderByTestDateDesc(
            UUID userId
    );

    Optional<MedicalTest> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<MedicalTest> findAllByUser_IdAndDisease_IdOrderByTestDateDesc(
            UUID userId,
            UUID diseaseId
    );

    List<MedicalTest> findAllByUser_IdAndVisit_IdOrderByTestDateDesc(
            UUID userId,
            UUID visitId
    );

    List<MedicalTest> findAllByUser_IdAndCategoryOrderByTestDateDesc(
            UUID userId,
            TestCategory category
    );

    List<MedicalTest> findAllByUser_IdAndNameContainingIgnoreCaseOrderByTestDateDesc(
            UUID userId,
            String name
    );

    List<MedicalTest> findAllByUser_IdAndLaboratoryContainingIgnoreCaseOrderByTestDateDesc(
            UUID userId,
            String laboratory
    );

    List<MedicalTest> findAllByUser_IdOrderByTestDateDesc(
            UUID userId,
            Pageable pageable
    );
}