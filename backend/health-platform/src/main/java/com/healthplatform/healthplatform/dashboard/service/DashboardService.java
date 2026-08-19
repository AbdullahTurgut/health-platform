package com.healthplatform.healthplatform.dashboard.service;

import com.healthplatform.healthplatform.dashboard.dto.DashboardCountsResponse;
import com.healthplatform.healthplatform.dashboard.dto.DashboardRecentItem;
import com.healthplatform.healthplatform.dashboard.dto.DashboardSummaryResponse;
import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.imaging.repository.ImagingRepository;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.repository.MedicalTestRepository;
import com.healthplatform.healthplatform.medication.model.MedicationStatus;
import com.healthplatform.healthplatform.medication.repository.MedicationRepository;
import com.healthplatform.healthplatform.document.repository.MedicalDocumentRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.timeline.dto.TimelinePageResponse;
import com.healthplatform.healthplatform.timeline.service.TimelineService;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private static final int RECENT_ITEM_LIMIT = 5;

    private final DiseaseRepository diseaseRepository;
    private final MedicationRepository medicationRepository;
    private final VisitRepository visitRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final ImagingRepository imagingRepository;
    private final MedicalDocumentRepository medicalDocumentRepository;
    private final TimelineService timelineService;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public DashboardSummaryResponse getSummary() {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        DashboardCountsResponse counts =
                buildCounts(userId);

        var recentPage =
                PageRequest.of(
                        0,
                        RECENT_ITEM_LIMIT
                );

        List<DashboardRecentItem> recentVisits =
                visitRepository
                        .findAllByUser_IdOrderByVisitDateDesc(
                                userId,
                                recentPage
                        )
                        .stream()
                        .map(this::fromVisit)
                        .toList();

        List<DashboardRecentItem> recentMedicalTests =
                medicalTestRepository
                        .findAllByUser_IdOrderByTestDateDesc(
                                userId,
                                recentPage
                        )
                        .stream()
                        .map(this::fromMedicalTest)
                        .toList();

        List<DashboardRecentItem> recentImaging =
                imagingRepository
                        .findAllByUser_IdOrderByImagingDateDesc(
                                userId,
                                recentPage
                        )
                        .stream()
                        .map(this::fromImaging)
                        .toList();

        TimelinePageResponse timeline =
                timelineService.getTimeline(
                        null,
                        null,
                        null,
                        null,
                        0,
                        RECENT_ITEM_LIMIT
                );

        return new DashboardSummaryResponse(
                counts,
                recentVisits,
                recentMedicalTests,
                recentImaging,
                timeline.content()
        );
    }

    private DashboardCountsResponse buildCounts(
            UUID userId
    ) {

        long activeDiseases =
                diseaseRepository
                        .countByUser_IdAndStatus(
                                userId,
                                DiseaseStatus.ACTIVE
                        );

        long activeMedications =
                medicationRepository
                        .countByUser_IdAndStatus(
                                userId,
                                MedicationStatus.ACTIVE
                        );

        long totalVisits =
                visitRepository
                        .countByUser_Id(userId);

        long totalMedicalTests =
                medicalTestRepository
                        .countByUser_Id(userId);

        long totalImaging =
                imagingRepository
                        .countByUser_Id(userId);

        long totalDocuments =
                medicalDocumentRepository
                        .countByUser_Id(userId);

        return new DashboardCountsResponse(
                activeDiseases,
                activeMedications,
                totalVisits,
                totalMedicalTests,
                totalImaging,
                totalDocuments
        );
    }

    private DashboardRecentItem fromVisit(
            Visit visit
    ) {

        String title =
                visit.getDepartment() != null
                        ? visit.getDepartment() + " Visit"
                        : "Medical Visit";

        String subtitle = null;

        if (visit.getDoctor() != null) {

            subtitle =
                    visit.getDoctor().getFirstName()
                            + " "
                            + visit.getDoctor().getLastName();
        }

        if (visit.getHospital() != null) {

            subtitle =
                    subtitle == null
                            ? visit.getHospital().getName()
                            : subtitle
                            + " · "
                            + visit.getHospital().getName();
        }

        return new DashboardRecentItem(
                visit.getId(),
                "VISIT",
                title,
                subtitle,
                visit.getVisitDate()
        );
    }

    private DashboardRecentItem fromMedicalTest(
            MedicalTest medicalTest
    ) {

        String subtitle =
                medicalTest.getCategory().name();

        if (medicalTest.getLaboratory() != null) {

            subtitle +=
                    " · "
                            + medicalTest.getLaboratory();
        }

        return new DashboardRecentItem(
                medicalTest.getId(),
                "MEDICAL_TEST",
                medicalTest.getName(),
                subtitle,
                medicalTest.getTestDate()
        );
    }

    private DashboardRecentItem fromImaging(
            Imaging imaging
    ) {

        String title =
                imaging.getBodyPart() != null
                        ? imaging.getType().name()
                        + " - "
                        + imaging.getBodyPart()
                        : imaging.getType().name();

        String subtitle =
                imaging.getHospital() != null
                        ? imaging.getHospital().getName()
                        : null;

        return new DashboardRecentItem(
                imaging.getId(),
                "IMAGING",
                title,
                subtitle,
                imaging.getImagingDate()
        );
    }
}
