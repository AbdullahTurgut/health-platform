package com.healthplatform.healthplatform.imaging.repository;

import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.imaging.model.ImagingType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ImagingRepository extends JpaRepository<Imaging, UUID> {


    List<Imaging> findAllByUser_IdOrderByImagingDateDesc(
            UUID userId
    );

    Optional<Imaging> findByIdAndUser_Id(
            UUID id,
            UUID userId
    );

    List<Imaging> findAllByUser_IdAndDisease_IdOrderByImagingDateDesc(
            UUID userId,
            UUID diseaseId
    );

    List<Imaging> findAllByUser_IdAndVisit_IdOrderByImagingDateDesc(
            UUID userId,
            UUID visitId
    );

    List<Imaging> findAllByUser_IdAndDoctor_IdOrderByImagingDateDesc(
            UUID userId,
            UUID doctorId
    );

    List<Imaging> findAllByUser_IdAndHospital_IdOrderByImagingDateDesc(
            UUID userId,
            UUID hospitalId
    );

    List<Imaging> findAllByUser_IdAndTypeOrderByImagingDateDesc(
            UUID userId,
            ImagingType type
    );

    List<Imaging> findAllByUser_IdAndBodyPartContainingIgnoreCaseOrderByImagingDateDesc(
            UUID userId,
            String bodyPart
    );

    List<Imaging> findAllByUser_IdAndReportContainingIgnoreCaseOrderByImagingDateDesc(
            UUID userId,
            String report
    );

    List<Imaging> findAllByUser_IdAndNotesContainingIgnoreCaseOrderByImagingDateDesc(
            UUID userId,
            String notes
    );
}
