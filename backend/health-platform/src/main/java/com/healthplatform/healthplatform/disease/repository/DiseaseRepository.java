package com.healthplatform.healthplatform.disease.repository;


import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DiseaseRepository extends JpaRepository<Disease, UUID> {

    List<Disease> findAllByUser_Id(UUID userId);

    Optional<Disease> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<Disease> findAllByUser_IdAndStatus(
            UUID userId,
            DiseaseStatus status
    );
}
