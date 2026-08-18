package com.healthplatform.healthplatform.imaging.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.doctor.entity.Doctor;
import com.healthplatform.healthplatform.doctor.repository.DoctorRepository;
import com.healthplatform.healthplatform.hospital.entity.Hospital;
import com.healthplatform.healthplatform.hospital.repository.HospitalRepository;
import com.healthplatform.healthplatform.imaging.dto.CreateImagingRequest;
import com.healthplatform.healthplatform.imaging.dto.ImagingResponse;
import com.healthplatform.healthplatform.imaging.dto.UpdateImagingRequest;
import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.imaging.model.ImagingType;
import com.healthplatform.healthplatform.imaging.repository.ImagingRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ImagingService {

    private final ImagingRepository imagingRepository;
    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final VisitRepository visitRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<ImagingResponse> getAllImaging(
            UUID diseaseId,
            UUID visitId,
            UUID doctorId,
            UUID hospitalId,
            ImagingType type,
            String bodyPart
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        long filterCount = Stream.of(
                        diseaseId,
                        visitId,
                        doctorId,
                        hospitalId,
                        type,
                        normalizeBodyPartFilter(bodyPart)
                )
                .filter(Objects::nonNull)
                .count();

        if (filterCount > 1) {
            throw new IllegalArgumentException(
                    "Only one imaging filter can be used at a time"
            );
        }

        List<Imaging> imaging;

        if (diseaseId != null) {

            resolveDisease(diseaseId, userId);

            imaging = imagingRepository
                    .findAllByUser_IdAndDisease_IdOrderByImagingDateDesc(
                            userId,
                            diseaseId
                    );

        } else if (visitId != null) {

            resolveVisit(visitId, userId);

            imaging = imagingRepository
                    .findAllByUser_IdAndVisit_IdOrderByImagingDateDesc(
                            userId,
                            visitId
                    );

        } else if (doctorId != null) {

            resolveDoctor(doctorId, userId);

            imaging = imagingRepository
                    .findAllByUser_IdAndDoctor_IdOrderByImagingDateDesc(
                            userId,
                            doctorId
                    );

        } else if (hospitalId != null) {

            resolveHospital(hospitalId, userId);

            imaging = imagingRepository
                    .findAllByUser_IdAndHospital_IdOrderByImagingDateDesc(
                            userId,
                            hospitalId
                    );

        } else if (type != null) {

            imaging = imagingRepository
                    .findAllByUser_IdAndTypeOrderByImagingDateDesc(
                            userId,
                            type
                    );

        } else if (normalizeBodyPartFilter(bodyPart) != null) {

            imaging = imagingRepository
                    .findAllByUser_IdAndBodyPartContainingIgnoreCaseOrderByImagingDateDesc(
                            userId,
                            bodyPart.trim()
                    );

        } else {

            imaging = imagingRepository
                    .findAllByUser_IdOrderByImagingDateDesc(
                            userId
                    );
        }

        return imaging
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ImagingResponse getImaging(UUID imagingId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedImaging(
                        imagingId,
                        userId
                )
        );
    }

    @Transactional
    public ImagingResponse createImaging(
            CreateImagingRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        Disease disease =
                resolveDisease(
                        request.diseaseId(),
                        userId
                );

        Visit visit =
                resolveVisit(
                        request.visitId(),
                        userId
                );

        Doctor doctor =
                resolveDoctor(
                        request.doctorId(),
                        userId
                );

        Hospital hospital =
                resolveHospital(
                        request.hospitalId(),
                        userId
                );

        Imaging imaging = new Imaging();

        imaging.setUser(user);
        imaging.setDisease(disease);
        imaging.setVisit(visit);
        imaging.setDoctor(doctor);
        imaging.setHospital(hospital);
        imaging.setType(request.type());
        imaging.setBodyPart(trimToNull(request.bodyPart()));
        imaging.setImagingDate(request.imagingDate());
        imaging.setReport(trimToNull(request.report()));
        imaging.setNotes(trimToNull(request.notes()));

        Imaging saved =
                imagingRepository.save(imaging);

        return toResponse(saved);
    }

    @Transactional
    public ImagingResponse updateImaging(
            UUID imagingId,
            UpdateImagingRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Imaging imaging =
                findOwnedImaging(
                        imagingId,
                        userId
                );

        Disease disease =
                resolveDisease(
                        request.diseaseId(),
                        userId
                );

        Visit visit =
                resolveVisit(
                        request.visitId(),
                        userId
                );

        Doctor doctor =
                resolveDoctor(
                        request.doctorId(),
                        userId
                );

        Hospital hospital =
                resolveHospital(
                        request.hospitalId(),
                        userId
                );

        imaging.setDisease(disease);
        imaging.setVisit(visit);
        imaging.setDoctor(doctor);
        imaging.setHospital(hospital);
        imaging.setType(request.type());
        imaging.setBodyPart(trimToNull(request.bodyPart()));
        imaging.setImagingDate(request.imagingDate());
        imaging.setReport(trimToNull(request.report()));
        imaging.setNotes(trimToNull(request.notes()));

        return toResponse(imaging);
    }

    @Transactional
    public void deleteImaging(UUID imagingId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Imaging imaging =
                findOwnedImaging(
                        imagingId,
                        userId
                );

        imagingRepository.delete(imaging);
    }

    private Imaging findOwnedImaging(
            UUID imagingId,
            UUID userId
    ) {

        return imagingRepository
                .findByIdAndUser_Id(
                        imagingId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Imaging not found"
                        )
                );
    }

    private Disease resolveDisease(
            UUID diseaseId,
            UUID userId
    ) {

        if (diseaseId == null) {
            return null;
        }

        return diseaseRepository
                .findByIdAndUser_Id(
                        diseaseId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Disease not found"
                        )
                );
    }

    private Visit resolveVisit(
            UUID visitId,
            UUID userId
    ) {

        if (visitId == null) {
            return null;
        }

        return visitRepository
                .findByIdAndUser_Id(
                        visitId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Visit not found"
                        )
                );
    }

    private Doctor resolveDoctor(
            UUID doctorId,
            UUID userId
    ) {

        if (doctorId == null) {
            return null;
        }

        return doctorRepository
                .findByIdAndUser_Id(
                        doctorId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found"
                        )
                );
    }

    private Hospital resolveHospital(
            UUID hospitalId,
            UUID userId
    ) {

        if (hospitalId == null) {
            return null;
        }

        return hospitalRepository
                .findByIdAndUser_Id(
                        hospitalId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hospital not found"
                        )
                );
    }

    private ImagingResponse toResponse(
            Imaging imaging
    ) {

        Disease disease =
                imaging.getDisease();

        Visit visit =
                imaging.getVisit();

        Doctor doctor =
                imaging.getDoctor();

        Hospital hospital =
                imaging.getHospital();

        return new ImagingResponse(
                imaging.getId(),

                disease != null ? disease.getId() : null,
                disease != null ? disease.getName() : null,

                visit != null ? visit.getId() : null,
                visit != null ? visit.getVisitDate() : null,

                doctor != null ? doctor.getId() : null,
                doctor != null
                        ? doctor.getFirstName()
                        + " "
                        + doctor.getLastName()
                        : null,

                hospital != null ? hospital.getId() : null,
                hospital != null ? hospital.getName() : null,

                imaging.getType(),
                imaging.getBodyPart(),
                imaging.getImagingDate(),
                imaging.getReport(),
                imaging.getNotes(),

                imaging.getCreatedAt(),
                imaging.getUpdatedAt()
        );
    }

    private String normalizeBodyPartFilter(
            String bodyPart
    ) {

        if (bodyPart == null) {
            return null;
        }

        String trimmed =
                bodyPart.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }

    private String trimToNull(
            String value
    ) {

        if (value == null) {
            return null;
        }

        String trimmed =
                value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }
}
