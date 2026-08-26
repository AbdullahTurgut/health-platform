package com.healthplatform.healthplatform.search.service;

import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.doctor.entity.Doctor;
import com.healthplatform.healthplatform.doctor.repository.DoctorRepository;
import com.healthplatform.healthplatform.document.entity.MedicalDocument;
import com.healthplatform.healthplatform.document.repository.MedicalDocumentRepository;
import com.healthplatform.healthplatform.hospital.entity.Hospital;
import com.healthplatform.healthplatform.hospital.repository.HospitalRepository;
import com.healthplatform.healthplatform.imaging.entity.Imaging;
import com.healthplatform.healthplatform.imaging.repository.ImagingRepository;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.entity.TestResult;
import com.healthplatform.healthplatform.medicaltest.repository.MedicalTestRepository;
import com.healthplatform.healthplatform.medicaltest.repository.TestResultRepository;
import com.healthplatform.healthplatform.medication.entity.Medication;
import com.healthplatform.healthplatform.medication.repository.MedicationRepository;
import com.healthplatform.healthplatform.search.dto.SearchPageResponse;
import com.healthplatform.healthplatform.search.dto.SearchResultItem;
import com.healthplatform.healthplatform.search.model.SearchResultType;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;

import java.util.Locale;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GlobalSearchService {

    private static final int MIN_QUERY_LENGTH = 2;
    private static final int MAX_RESULTS = 50;
    private static final int MAX_PAGE_SIZE = 100;

    private final DiseaseRepository diseaseRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final VisitRepository visitRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final TestResultRepository testResultRepository;
    private final ImagingRepository imagingRepository;
    private final MedicalDocumentRepository medicalDocumentRepository;
    private final MedicationRepository medicationRepository;
    private final CurrentUserProvider currentUserProvider;


    @Transactional(readOnly = true)
    public SearchPageResponse search(
            String query,
            SearchResultType type,
            UUID diseaseId,
            int page,
            int size
    ) {

        String normalizedQuery =
                normalizeQuery(query);

        validatePagination(
                page,
                size
        );

        UUID userId =
                currentUserProvider.getCurrentUserId();

        validateDiseaseOwnership(
                diseaseId,
                userId
        );

        List<SearchResultItem> results =
                new ArrayList<>();

        searchDiseases(
                userId,
                normalizedQuery,
                results
        );

        searchDoctors(
                userId,
                normalizedQuery,
                results
        );

        searchHospitals(
                userId,
                normalizedQuery,
                results
        );

        searchVisits(
                userId,
                normalizedQuery,
                results
        );

        searchMedicalTests(
                userId,
                normalizedQuery,
                results
        );

        searchTestResults(
                userId,
                normalizedQuery,
                results
        );

        searchImaging(
                userId,
                normalizedQuery,
                results
        );

        searchDocuments(
                userId,
                normalizedQuery,
                results
        );

        searchMedications(
                userId,
                normalizedQuery,
                results
        );

        List<SearchResultItem> filtered =
                deduplicate(results)
                        .stream()

                        .filter(result ->
                                type == null
                                        || result.type() == type
                        )

                        .filter(result ->
                                diseaseId == null
                                        || diseaseId.equals(
                                        result.diseaseId()
                                )
                        )

                        .map(result ->
                                withRelevanceScore(
                                        result,
                                        normalizedQuery
                                )
                        )

                        .sorted(
                                Comparator
                                        .comparingInt(
                                                SearchResultItem::relevanceScore
                                        )
                                        .reversed()
                                        .thenComparing(
                                                SearchResultItem::eventDate,
                                                Comparator.nullsLast(
                                                        Comparator.reverseOrder()
                                                )
                                        )
                        )

                        .toList();

        return paginate(
                normalizedQuery,
                filtered,
                page,
                size
        );
    }

    private SearchPageResponse paginate(
            String query,
            List<SearchResultItem> results,
            int page,
            int size
    ) {

        long totalElements =
                results.size();

        int totalPages =
                totalElements == 0
                        ? 0
                        : (int) Math.ceil(
                        (double) totalElements / size
                );

        long offset =
                (long) page * size;

        if (offset >= totalElements) {

            return new SearchPageResponse(
                    query,
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
                        results.size()
                );

        return new SearchPageResponse(
                query,
                results.subList(
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

    private String normalizeQuery(
            String query
    ) {

        if (query == null) {
            throw new IllegalArgumentException(
                    "Search query is required"
            );
        }

        String normalized =
                query.trim();

        if (normalized.length() < MIN_QUERY_LENGTH) {
            throw new IllegalArgumentException(
                    "Search query must contain at least 2 characters"
            );
        }

        if (normalized.length() > 200) {
            throw new IllegalArgumentException(
                    "Search query cannot exceed 200 characters"
            );
        }

        return normalized;
    }

    private void searchDiseases(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        diseaseRepository
                .findAllByUser_IdAndNameContainingIgnoreCaseOrderByCreatedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromDisease)
                .forEach(results::add);
    }


    private String normalizeForSearch(
            String value
    ) {

        if (value == null) {
            return null;
        }

        return value
                .trim()
                .toLowerCase(Locale.ROOT);
    }

    private SearchResultItem fromDisease(
            Disease disease
    ) {

        return new SearchResultItem(
                disease.getId(),
                SearchResultType.DISEASE,
                disease.getName(),
                disease.getStatus().name(),
                disease.getDescription(),
                disease.getCreatedAt(),
                disease.getId(),
                disease.getName(),
                0
        );
    }

    private SearchResultItem withRelevanceScore(
            SearchResultItem result,
            String query
    ) {

        int score =
                calculateRelevanceScore(
                        result,
                        query
                );

        return new SearchResultItem(
                result.id(),
                result.type(),
                result.title(),
                result.subtitle(),
                result.description(),
                result.eventDate(),
                result.diseaseId(),
                result.diseaseName(),
                score
        );
    }
    private int calculateRelevanceScore(
            SearchResultItem result,
            String query
    ) {

        String normalizedQuery =
                query.toLowerCase(Locale.ROOT);

        String title =
                normalizeForSearch(
                        result.title()
                );

        String subtitle =
                normalizeForSearch(
                        result.subtitle()
                );

        String description =
                normalizeForSearch(
                        result.description()
                );

        if (
                title != null
                        && title.equals(normalizedQuery)
        ) {
            return 100;
        }

        if (
                title != null
                        && title.startsWith(normalizedQuery)
        ) {
            return 80;
        }

        if (
                title != null
                        && title.contains(normalizedQuery)
        ) {
            return 60;
        }

        if (
                subtitle != null
                        && subtitle.contains(normalizedQuery)
        ) {
            return 40;
        }

        if (
                description != null
                        && description.contains(normalizedQuery)
        ) {
            return 20;
        }

        return 10;
    }

    private void searchDoctors(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        doctorRepository
                .findAllByUser_IdAndFirstNameContainingIgnoreCaseOrderByCreatedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromDoctor)
                .forEach(results::add);

        doctorRepository
                .findAllByUser_IdAndLastNameContainingIgnoreCaseOrderByCreatedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromDoctor)
                .forEach(results::add);

        doctorRepository
                .findAllByUser_IdAndSpecializationContainingIgnoreCaseOrderByCreatedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromDoctor)
                .forEach(results::add);
    }

    private SearchResultItem fromDoctor(
            Doctor doctor
    ) {

        return new SearchResultItem(
                doctor.getId(),
                SearchResultType.DOCTOR,
                doctor.getFirstName()
                        + " "
                        + doctor.getLastName(),
                doctor.getSpecialization(),
                doctor.getNotes(),
                doctor.getCreatedAt(),
                null,
                null,
                0
        );
    }

    private void searchHospitals(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        hospitalRepository
                .findAllByUser_IdAndNameContainingIgnoreCaseOrderByCreatedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromHospital)
                .forEach(results::add);

        hospitalRepository
                .findAllByUser_IdAndCityContainingIgnoreCaseOrderByCreatedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromHospital)
                .forEach(results::add);
    }

    private SearchResultItem fromHospital(
            Hospital hospital
    ) {

        return new SearchResultItem(
                hospital.getId(),
                SearchResultType.HOSPITAL,
                hospital.getName(),
                hospital.getCity(),
                hospital.getAddress(),
                hospital.getCreatedAt(),
                null,
                null,
                0
        );
    }

    private void searchVisits(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        visitRepository
                .findAllByUser_IdAndDepartmentContainingIgnoreCaseOrderByVisitDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromVisit)
                .forEach(results::add);

        visitRepository
                .findAllByUser_IdAndReasonContainingIgnoreCaseOrderByVisitDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromVisit)
                .forEach(results::add);

        visitRepository
                .findAllByUser_IdAndDiagnosisNoteContainingIgnoreCaseOrderByVisitDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromVisit)
                .forEach(results::add);

        visitRepository
                .findAllByUser_IdAndNotesContainingIgnoreCaseOrderByVisitDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromVisit)
                .forEach(results::add);
    }

    private SearchResultItem fromVisit(
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

        return new SearchResultItem(
                visit.getId(),
                SearchResultType.VISIT,
                title,
                subtitle,
                visit.getReason(),
                visit.getVisitDate(),
                visit.getDisease() != null
                        ? visit.getDisease().getId()
                        : null,
                visit.getDisease() != null
                        ? visit.getDisease().getName()
                        : null,
                0
        );
    }

    private void searchMedicalTests(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        medicalTestRepository
                .findAllByUser_IdAndNameContainingIgnoreCaseOrderByTestDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromMedicalTest)
                .forEach(results::add);

        medicalTestRepository
                .findAllByUser_IdAndLaboratoryContainingIgnoreCaseOrderByTestDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromMedicalTest)
                .forEach(results::add);
    }

    private SearchResultItem fromMedicalTest(
            MedicalTest test
    ) {

        String subtitle =
                test.getCategory().name();

        if (test.getLaboratory() != null) {
            subtitle +=
                    " · "
                            + test.getLaboratory();
        }

        return new SearchResultItem(
                test.getId(),
                SearchResultType.MEDICAL_TEST,
                test.getName(),
                subtitle,
                test.getNotes(),
                test.getTestDate(),
                test.getDisease() != null
                        ? test.getDisease().getId()
                        : null,
                test.getDisease() != null
                        ? test.getDisease().getName()
                        : null,
                0
        );
    }

    private void searchTestResults(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        testResultRepository
                .findAllByMedicalTest_User_IdAndParameterNameContainingIgnoreCaseOrderByMedicalTest_TestDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromTestResult)
                .forEach(results::add);

        testResultRepository
                .findAllByMedicalTest_User_IdAndValueTextContainingIgnoreCaseOrderByMedicalTest_TestDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromTestResult)
                .forEach(results::add);
    }

    private SearchResultItem fromTestResult(
            TestResult result
    ) {

        MedicalTest test =
                result.getMedicalTest();

        String subtitle =
                result.getValueText();

        if (result.getUnit() != null) {
            subtitle +=
                    " "
                            + result.getUnit();
        }

        if (result.getFlag() != null) {
            subtitle +=
                    " · "
                            + result.getFlag().name();
        }

        return new SearchResultItem(
                result.getId(),
                SearchResultType.TEST_RESULT,
                result.getParameterName(),
                subtitle,
                test.getName(),
                test.getTestDate(),
                test.getDisease() != null
                        ? test.getDisease().getId()
                        : null,
                test.getDisease() != null
                        ? test.getDisease().getName()
                        : null,
                0
        );
    }

    private void searchImaging(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        imagingRepository
                .findAllByUser_IdAndBodyPartContainingIgnoreCaseOrderByImagingDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromImaging)
                .forEach(results::add);

        imagingRepository
                .findAllByUser_IdAndReportContainingIgnoreCaseOrderByImagingDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromImaging)
                .forEach(results::add);

        imagingRepository
                .findAllByUser_IdAndNotesContainingIgnoreCaseOrderByImagingDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromImaging)
                .forEach(results::add);
    }

    private SearchResultItem fromImaging(
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

        return new SearchResultItem(
                imaging.getId(),
                SearchResultType.IMAGING,
                title,
                subtitle,
                imaging.getReport(),
                imaging.getImagingDate(),
                imaging.getDisease() != null
                        ? imaging.getDisease().getId()
                        : null,
                imaging.getDisease() != null
                        ? imaging.getDisease().getName()
                        : null,
                0
        );
    }

    private void searchDocuments(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        medicalDocumentRepository
                .findAllByUser_IdAndNameContainingIgnoreCaseOrderByUploadedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromDocument)
                .forEach(results::add);

        medicalDocumentRepository
                .findAllByUser_IdAndFileNameContainingIgnoreCaseOrderByUploadedAtDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromDocument)
                .forEach(results::add);
    }

    private SearchResultItem fromDocument(
            MedicalDocument document
    ) {

        return new SearchResultItem(
                document.getId(),
                SearchResultType.DOCUMENT,
                document.getName(),
                document.getDocumentType().name(),
                document.getFileName(),
                document.getUploadedAt(),
                document.getDisease() != null
                        ? document.getDisease().getId()
                        : null,
                document.getDisease() != null
                        ? document.getDisease().getName()
                        : null,
                0
        );
    }

    private void searchMedications(
            UUID userId,
            String query,
            List<SearchResultItem> results
    ) {

        medicationRepository
                .findAllByUser_IdAndNameContainingIgnoreCaseOrderByStartDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromMedication)
                .forEach(results::add);

        medicationRepository
                .findAllByUser_IdAndPrescribedByContainingIgnoreCaseOrderByStartDateDesc(
                        userId,
                        query
                )
                .stream()
                .map(this::fromMedication)
                .forEach(results::add);
    }

    private SearchResultItem fromMedication(
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

        return new SearchResultItem(
                medication.getId(),
                SearchResultType.MEDICATION,
                medication.getName(),
                subtitle,
                medication.getPrescribedBy(),
                medication.getStartDate() != null
                        ? medication.getStartDate()
                        .atStartOfDay(ZoneOffset.UTC)
                        .toInstant()
                        : null,
                medication.getDisease() != null
                        ? medication.getDisease().getId()
                        : null,
                medication.getDisease() != null
                        ? medication.getDisease().getName()
                        : null,
                0
        );
    }

    private List<SearchResultItem> deduplicate(
            List<SearchResultItem> results
    ) {

        Map<String, SearchResultItem> unique =
                new LinkedHashMap<>();

        for (SearchResultItem result : results) {

            String key =
                    result.type().name()
                            + ":"
                            + result.id();

            unique.putIfAbsent(
                    key,
                    result
            );
        }

        return new ArrayList<>(
                unique.values()
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
}
