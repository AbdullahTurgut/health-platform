package com.healthplatform.healthplatform.medication.repository;

import com.healthplatform.healthplatform.medication.entity.Medication;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MedicationRepository
        extends JpaRepository<Medication, UUID> {

    long countByUser_Id(
            UUID userId
    );

    long countByUser_IdAndStatus(
            UUID userId,
            MedicationStatus status
    );

    List<Medication> findAllByUser_IdOrderByStartDateDesc(
            UUID userId
    );

    Optional<Medication> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<Medication> findAllByUser_IdAndDisease_IdOrderByStartDateDesc(
            UUID userId,
            UUID diseaseId
    );

    List<Medication> findAllByUser_IdAndStatusOrderByStartDateDesc(
            UUID userId,
            MedicationStatus status
    );

    List<Medication> findAllByUser_IdAndNameContainingIgnoreCaseOrderByStartDateDesc(
            UUID userId,
            String name
    );

    List<Medication> findAllByUser_IdAndPrescribedByContainingIgnoreCaseOrderByStartDateDesc(
            UUID userId,
            String prescribedBy
    );


}
