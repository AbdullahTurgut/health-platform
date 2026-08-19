package com.healthplatform.healthplatform.doctor.repository;

import com.healthplatform.healthplatform.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

    List<Doctor> findAllByUser_Id(UUID userId);

    Optional<Doctor> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<Doctor> findAllByUser_IdAndSpecializationIgnoreCase(
            UUID userId,
            String specialization
    );

    List<Doctor> findAllByUser_IdOrderByCreatedAtDesc(
            UUID userId
    );

    List<Doctor> findAllByUser_IdAndSpecializationIgnoreCaseOrderByCreatedAtDesc(
            UUID userId,
            String specialization
    );

    List<Doctor> findAllByUser_IdAndFirstNameContainingIgnoreCaseOrderByCreatedAtDesc(
            UUID userId,
            String firstName
    );

    List<Doctor> findAllByUser_IdAndLastNameContainingIgnoreCaseOrderByCreatedAtDesc(
            UUID userId,
            String lastName
    );

    List<Doctor> findAllByUser_IdAndSpecializationContainingIgnoreCaseOrderByCreatedAtDesc(
            UUID userId,
            String specialization
    );
}
