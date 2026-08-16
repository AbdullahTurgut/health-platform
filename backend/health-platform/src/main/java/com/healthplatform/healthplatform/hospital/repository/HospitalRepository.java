package com.healthplatform.healthplatform.hospital.repository;

import com.healthplatform.healthplatform.hospital.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HospitalRepository extends JpaRepository<Hospital, UUID> {

    List<Hospital> findAllByUser_Id(UUID userId);

    Optional<Hospital> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<Hospital> findAllByUser_IdAndCityIgnoreCase(
            UUID userId,
            String city
    );
}
