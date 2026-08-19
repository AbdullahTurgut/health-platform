package com.healthplatform.healthplatform.medication.service;


import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.medication.dto.CreateMedicationRequest;
import com.healthplatform.healthplatform.medication.dto.MedicationResponse;
import com.healthplatform.healthplatform.medication.dto.UpdateMedicationRequest;
import com.healthplatform.healthplatform.medication.entity.Medication;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import com.healthplatform.healthplatform.medication.repository.MedicationRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class MedicationService {

    private final MedicationRepository medicationRepository;
    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<MedicationResponse> getAllMedications(
            UUID diseaseId,
            MedicationStatus status,
            String name
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        String normalizedName =
                normalizeFilter(name);

        long filterCount =
                Stream.of(
                                diseaseId,
                                status,
                                normalizedName
                        )
                        .filter(Objects::nonNull)
                        .count();

        if (filterCount > 1) {
            throw new IllegalArgumentException(
                    "Only one medication filter can be used at a time"
            );
        }

        List<Medication> medications;

        if (diseaseId != null) {

            resolveDisease(
                    diseaseId,
                    userId
            );

            medications =
                    medicationRepository
                            .findAllByUser_IdAndDisease_IdOrderByStartDateDesc(
                                    userId,
                                    diseaseId
                            );

        } else if (status != null) {

            medications =
                    medicationRepository
                            .findAllByUser_IdAndStatusOrderByStartDateDesc(
                                    userId,
                                    status
                            );

        } else if (normalizedName != null) {

            medications =
                    medicationRepository
                            .findAllByUser_IdAndNameContainingIgnoreCaseOrderByStartDateDesc(
                                    userId,
                                    normalizedName
                            );

        } else {

            medications =
                    medicationRepository
                            .findAllByUser_IdOrderByStartDateDesc(
                                    userId
                            );
        }

        return medications
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public MedicationResponse getMedication(
            UUID medicationId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedMedication(
                        medicationId,
                        userId
                )
        );
    }

    @Transactional
    public MedicationResponse createMedication(
            CreateMedicationRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        validateDateRange(
                request.startDate(),
                request.endDate()
        );

        User user =
                userRepository
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

        Medication medication =
                new Medication();

        medication.setUser(user);
        medication.setDisease(disease);
        medication.setName(request.name().trim());

        medication.setDosage(
                trimToNull(request.dosage())
        );

        medication.setFrequency(
                trimToNull(request.frequency())
        );

        medication.setRoute(
                request.route()
        );

        medication.setStartDate(
                request.startDate()
        );

        medication.setEndDate(
                request.endDate()
        );

        medication.setStatus(
                request.status() != null
                        ? request.status()
                        : MedicationStatus.ACTIVE
        );

        medication.setPrescribedBy(
                trimToNull(request.prescribedBy())
        );

        medication.setNotes(
                trimToNull(request.notes())
        );

        Medication saved =
                medicationRepository.save(
                        medication
                );

        return toResponse(saved);
    }

    @Transactional
    public MedicationResponse updateMedication(
            UUID medicationId,
            UpdateMedicationRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        validateDateRange(
                request.startDate(),
                request.endDate()
        );

        Medication medication =
                findOwnedMedication(
                        medicationId,
                        userId
                );

        Disease disease =
                resolveDisease(
                        request.diseaseId(),
                        userId
                );

        medication.setDisease(disease);
        medication.setName(request.name().trim());

        medication.setDosage(
                trimToNull(request.dosage())
        );

        medication.setFrequency(
                trimToNull(request.frequency())
        );

        medication.setRoute(
                request.route()
        );

        medication.setStartDate(
                request.startDate()
        );

        medication.setEndDate(
                request.endDate()
        );

        medication.setStatus(
                request.status()
        );

        medication.setPrescribedBy(
                trimToNull(request.prescribedBy())
        );

        medication.setNotes(
                trimToNull(request.notes())
        );

        return toResponse(medication);
    }

    @Transactional
    public void deleteMedication(
            UUID medicationId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Medication medication =
                findOwnedMedication(
                        medicationId,
                        userId
                );

        medicationRepository.delete(
                medication
        );
    }

    private Medication findOwnedMedication(
            UUID medicationId,
            UUID userId
    ) {

        return medicationRepository
                .findByIdAndUser_Id(
                        medicationId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medication not found"
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

    private void validateDateRange(
            LocalDate startDate,
            LocalDate endDate
    ) {

        if (
                startDate != null
                        && endDate != null
                        && endDate.isBefore(startDate)
        ) {
            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }
    }

    private MedicationResponse toResponse(
            Medication medication
    ) {

        Disease disease =
                medication.getDisease();

        return new MedicationResponse(
                medication.getId(),

                disease != null
                        ? disease.getId()
                        : null,

                disease != null
                        ? disease.getName()
                        : null,

                medication.getName(),
                medication.getDosage(),
                medication.getFrequency(),
                medication.getRoute(),
                medication.getStartDate(),
                medication.getEndDate(),
                medication.getStatus(),
                medication.getPrescribedBy(),
                medication.getNotes(),
                medication.getCreatedAt(),
                medication.getUpdatedAt()
        );
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

    private String normalizeFilter(
            String value
    ) {

        return trimToNull(value);
    }
}
