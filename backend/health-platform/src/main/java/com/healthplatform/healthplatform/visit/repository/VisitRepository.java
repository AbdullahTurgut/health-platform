package com.healthplatform.healthplatform.visit.repository;

import com.healthplatform.healthplatform.visit.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VisitRepository extends JpaRepository<Visit, UUID> {

    List<Visit> findAllByUser_IdOrderByVisitDateDesc(
            UUID userId
    );

    Optional<Visit> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<Visit> findAllByUser_IdAndDisease_IdOrderByVisitDateDesc(
            UUID userId,
            UUID diseaseId
    );

    List<Visit> findAllByUser_IdAndDoctor_IdOrderByVisitDateDesc(
            UUID userId,
            UUID doctorId
    );

    List<Visit> findAllByUser_IdAndHospital_IdOrderByVisitDateDesc(
            UUID userId,
            UUID hospitalId
    );
}
