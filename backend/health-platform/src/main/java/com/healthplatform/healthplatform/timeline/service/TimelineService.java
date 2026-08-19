package com.healthplatform.healthplatform.timeline.service;

import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.document.entity.MedicalDocument;
import com.healthplatform.healthplatform.document.repository.MedicalDocumentRepository;
import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.imaging.repository.ImagingRepository;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.repository.MedicalTestRepository;
import com.healthplatform.healthplatform.medication.entity.Medication;
import com.healthplatform.healthplatform.medication.repository.MedicationRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.timeline.dto.TimelineEventResponse;
import com.healthplatform.healthplatform.timeline.dto.TimelinePageResponse;
import com.healthplatform.healthplatform.timeline.model.TimelineEventType;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TimelineService {

    private final VisitRepository visitRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final ImagingRepository imagingRepository;
    private final MedicalDocumentRepository medicalDocumentRepository;
    private final MedicationRepository medicationRepository;
    private final CurrentUserProvider currentUserProvider;
    private static final int MAX_PAGE_SIZE = 100;
    private final DiseaseRepository diseaseRepository;

    @Transactional(readOnly = true)
    public TimelinePageResponse getTimeline(
            TimelineEventType type,
            UUID diseaseId,
            Instant from,
            Instant to,
            int page,
            int size
    ) {

        validatePagination(
                page,
                size
        );

        validateDateRange(
                from,
                to
        );

        UUID userId =
                currentUserProvider.getCurrentUserId();

        validateDiseaseOwnership(
                diseaseId,
                userId
        );

        List<TimelineEventResponse> timeline =
                new ArrayList<>();

        visitRepository
                .findAllByUser_IdOrderByVisitDateDesc(userId)
                .stream()
                .map(this::fromVisit)
                .forEach(timeline::add);

        medicalTestRepository
                .findAllByUser_IdOrderByTestDateDesc(userId)
                .stream()
                .map(this::fromMedicalTest)
                .forEach(timeline::add);

        imagingRepository
                .findAllByUser_IdOrderByImagingDateDesc(userId)
                .stream()
                .map(this::fromImaging)
                .forEach(timeline::add);

        medicalDocumentRepository
                .findAllByUser_IdOrderByUploadedAtDesc(userId)
                .stream()
                .map(this::fromDocument)
                .forEach(timeline::add);

        medicationRepository
                .findAllByUser_IdOrderByStartDateDesc(userId)
                .stream()
                .filter(medication ->
                        medication.getStartDate() != null
                )
                .map(this::fromMedication)
                .forEach(timeline::add);

        List<TimelineEventResponse> filtered =
                timeline
                        .stream()

                        .filter(event ->
                                type == null
                                        || event.type() == type
                        )

                        .filter(event ->
                                diseaseId == null
                                        || diseaseId.equals(
                                        event.diseaseId()
                                )
                        )

                        .filter(event ->
                                from == null
                                        || !event.eventDate()
                                        .isBefore(from)
                        )

                        .filter(event ->
                                to == null
                                        || !event.eventDate()
                                        .isAfter(to)
                        )

                        .sorted(
                                Comparator.comparing(
                                        TimelineEventResponse::eventDate
                                ).reversed()
                        )

                        .toList();

        return paginate(
                filtered,
                page,
                size
        );
    }

    private TimelinePageResponse paginate(
            List<TimelineEventResponse> events,
            int page,
            int size
    ) {

        long totalElements =
                events.size();

        int totalPages =
                totalElements == 0
                        ? 0
                        : (int) Math.ceil(
                        (double) totalElements / size
                );

        long offset =
                (long) page * size;

        if (offset >= totalElements) {

            return new TimelinePageResponse(
                    List.of(),
                    page,
                    size,
                    totalElements,
                    totalPages,
                    page == 0,
                    true
            );
        }

        int fromIndex =
                (int) offset;

        int toIndex =
                Math.min(
                        fromIndex + size,
                        events.size()
                );

        return new TimelinePageResponse(
                events.subList(
                        fromIndex,
                        toIndex
                ),
                page,
                size,
                totalElements,
                totalPages,
                page == 0,
                page >= totalPages - 1
        );
    }

    private TimelineEventResponse fromVisit(
            Visit visit
    ) {

        String title =
                visit.getDepartment() != null
                        ? visit.getDepartment() + " Visit"
                        : "Medical Visit";

        String subtitle =
                buildVisitSubtitle(visit);

        return new TimelineEventResponse(
                visit.getId(),
                TimelineEventType.VISIT,
                visit.getVisitDate(),
                title,
                subtitle,
                visit.getReason(),
                visit.getDisease() != null
                        ? visit.getDisease().getId()
                        : null,
                visit.getDisease() != null
                        ? visit.getDisease().getName()
                        : null
        );
    }

    private String buildVisitSubtitle(
            Visit visit
    ) {

        List<String> parts =
                new ArrayList<>();

        if (visit.getDoctor() != null) {
            parts.add(
                    visit.getDoctor().getFirstName()
                            + " "
                            + visit.getDoctor().getLastName()
            );
        }

        if (visit.getHospital() != null) {
            parts.add(
                    visit.getHospital().getName()
            );
        }

        return parts.isEmpty()
                ? null
                : String.join(" · ", parts);
    }

    private TimelineEventResponse fromMedicalTest(
            MedicalTest medicalTest
    ) {

        String subtitle =
                medicalTest.getCategory().name();

        if (medicalTest.getLaboratory() != null) {
            subtitle +=
                    " · "
                            + medicalTest.getLaboratory();
        }

        return new TimelineEventResponse(
                medicalTest.getId(),
                TimelineEventType.MEDICAL_TEST,
                medicalTest.getTestDate(),
                medicalTest.getName(),
                subtitle,
                medicalTest.getNotes(),
                medicalTest.getDisease() != null
                        ? medicalTest.getDisease().getId()
                        : null,
                medicalTest.getDisease() != null
                        ? medicalTest.getDisease().getName()
                        : null
        );
    }

    private TimelineEventResponse fromImaging(
            Imaging imaging
    ) {

        String title =
                imaging.getBodyPart() != null
                        ? imaging.getType().name()
                        + " - "
                        + imaging.getBodyPart()
                        : imaging.getType().name();

        String subtitle = null;

        if (imaging.getHospital() != null) {
            subtitle =
                    imaging.getHospital().getName();
        }

        return new TimelineEventResponse(
                imaging.getId(),
                TimelineEventType.IMAGING,
                imaging.getImagingDate(),
                title,
                subtitle,
                imaging.getReport(),
                imaging.getDisease() != null
                        ? imaging.getDisease().getId()
                        : null,
                imaging.getDisease() != null
                        ? imaging.getDisease().getName()
                        : null
        );
    }

    private TimelineEventResponse fromDocument(
            MedicalDocument document
    ) {

        return new TimelineEventResponse(
                document.getId(),
                TimelineEventType.DOCUMENT,
                document.getUploadedAt(),
                document.getName(),
                document.getDocumentType().name(),
                document.getFileName(),
                document.getDisease() != null
                        ? document.getDisease().getId()
                        : null,
                document.getDisease() != null
                        ? document.getDisease().getName()
                        : null
        );
    }

    private TimelineEventResponse fromMedication(
            Medication medication
    ) {

        String subtitle =
                medication.getDosage();

        if (medication.getFrequency() != null) {

            subtitle =
                    subtitle == null
                            ? medication.getFrequency()
                            : subtitle
                            + " · "
                            + medication.getFrequency();
        }

        return new TimelineEventResponse(
                medication.getId(),
                TimelineEventType.MEDICATION,
                medication.getStartDate()
                        .atStartOfDay(ZoneOffset.UTC)
                        .toInstant(),
                medication.getName(),
                subtitle,
                medication.getNotes(),
                medication.getDisease() != null
                        ? medication.getDisease().getId()
                        : null,
                medication.getDisease() != null
                        ? medication.getDisease().getName()
                        : null
        );
    }

    private void validatePagination(
            int page,
            int size
    ) {

        if (page < 0) {
            throw new IllegalArgumentException(
                    "Page cannot be negative"
            );
        }

        if (size < 1 || size > MAX_PAGE_SIZE) {
            throw new IllegalArgumentException(
                    "Size must be between 1 and 100"
            );
        }
    }

    private void validateDiseaseOwnership(
            UUID diseaseId,
            UUID userId
    ) {

        if (diseaseId == null) {
            return;
        }

        diseaseRepository
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
            Instant from,
            Instant to
    ) {

        if (
                from != null
                        && to != null
                        && from.isAfter(to)
        ) {
            throw new IllegalArgumentException(
                    "From date cannot be after to date"
            );
        }
    }
}