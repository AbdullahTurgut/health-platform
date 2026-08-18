package com.healthplatform.healthplatform.visit.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.doctor.entity.Doctor;
import com.healthplatform.healthplatform.doctor.repository.DoctorRepository;
import com.healthplatform.healthplatform.hospital.entity.Hospital;
import com.healthplatform.healthplatform.hospital.repository.HospitalRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import com.healthplatform.healthplatform.visit.dto.CreateVisitRequest;
import com.healthplatform.healthplatform.visit.dto.UpdateVisitRequest;
import com.healthplatform.healthplatform.visit.dto.VisitResponse;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitRepository visitRepository;
    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<VisitResponse> getAllVisits(
            UUID diseaseId,
            UUID doctorId,
            UUID hospitalId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        long filterCount =
                java.util.stream.Stream.of(
                                diseaseId,
                                doctorId,
                                hospitalId
                        )
                        .filter(java.util.Objects::nonNull)
                        .count();

        if (filterCount > 1) {
            throw new IllegalArgumentException(
                    "Only one visit filter can be used at a time"
            );
        }

        List<Visit> visits;

        if (diseaseId != null) {

            resolveDisease(diseaseId, userId);

            visits = visitRepository
                    .findAllByUser_IdAndDisease_IdOrderByVisitDateDesc(
                            userId,
                            diseaseId
                    );

        } else if (doctorId != null) {

            resolveDoctor(doctorId, userId);

            visits = visitRepository
                    .findAllByUser_IdAndDoctor_IdOrderByVisitDateDesc(
                            userId,
                            doctorId
                    );

        } else if (hospitalId != null) {

            resolveHospital(hospitalId, userId);

            visits = visitRepository
                    .findAllByUser_IdAndHospital_IdOrderByVisitDateDesc(
                            userId,
                            hospitalId
                    );

        } else {

            visits = visitRepository
                    .findAllByUser_IdOrderByVisitDateDesc(
                            userId
                    );
        }

        return visits
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VisitResponse getVisit(UUID visitId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedVisit(
                        visitId,
                        userId
                )
        );
    }

    @Transactional
    public VisitResponse createVisit(
            CreateVisitRequest request
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

        Visit visit = new Visit();

        visit.setUser(user);
        setVisitEnvironment(visit, disease, doctor, hospital, request.visitDate());

        visit.setDepartment(
                trimToNull(request.department())
        );

        visit.setReason(
                trimToNull(request.reason())
        );

        visit.setDiagnosisNote(
                trimToNull(request.diagnosisNote())
        );

        visit.setNotes(
                trimToNull(request.notes())
        );

        Visit saved =
                visitRepository.save(visit);

        return toResponse(saved);
    }

    @Transactional
    public VisitResponse updateVisit(
            UUID visitId,
            UpdateVisitRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Visit visit =
                findOwnedVisit(
                        visitId,
                        userId
                );

        Disease disease =
                resolveDisease(
                        request.diseaseId(),
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

        setVisitEnvironment(visit, disease, doctor, hospital, request.visitDate());

        visit.setDepartment(
                trimToNull(request.department())
        );

        visit.setReason(
                trimToNull(request.reason())
        );

        visit.setDiagnosisNote(
                trimToNull(request.diagnosisNote())
        );

        visit.setNotes(
                trimToNull(request.notes())
        );

        return toResponse(visit);
    }

    private static void setVisitEnvironment(Visit visit, Disease disease, Doctor doctor, Hospital hospital, Instant request) {
        visit.setDisease(disease);
        visit.setDoctor(doctor);
        visit.setHospital(hospital);
        visit.setVisitDate(request);
    }

    @Transactional
    public void deleteVisit(UUID visitId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Visit visit =
                findOwnedVisit(
                        visitId,
                        userId
                );

        visitRepository.delete(visit);
    }

    private Visit findOwnedVisit(
            UUID visitId,
            UUID userId
    ) {

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

    private VisitResponse toResponse(
            Visit visit
    ) {

        Disease disease = visit.getDisease();
        Doctor doctor = visit.getDoctor();
        Hospital hospital = visit.getHospital();

        return new VisitResponse(
                visit.getId(),

                disease != null
                        ? disease.getId()
                        : null,

                disease != null
                        ? disease.getName()
                        : null,

                doctor != null
                        ? doctor.getId()
                        : null,

                doctor != null
                        ? doctor.getFirstName()
                        + " "
                        + doctor.getLastName()
                        : null,

                hospital != null
                        ? hospital.getId()
                        : null,

                hospital != null
                        ? hospital.getName()
                        : null,

                visit.getVisitDate(),
                visit.getDepartment(),
                visit.getReason(),
                visit.getDiagnosisNote(),
                visit.getNotes(),

                visit.getCreatedAt(),
                visit.getUpdatedAt()
        );
    }

    private String trimToNull(String value) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }
}
