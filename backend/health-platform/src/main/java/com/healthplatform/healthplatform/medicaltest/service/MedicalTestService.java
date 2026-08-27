package com.healthplatform.healthplatform.medicaltest.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.medicaltest.dto.CreateMedicalTestRequest;
import com.healthplatform.healthplatform.medicaltest.dto.MedicalTestResponse;
import com.healthplatform.healthplatform.medicaltest.dto.UpdateMedicalTestRequest;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.model.TestCategory;
import com.healthplatform.healthplatform.medicaltest.repository.MedicalTestRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import com.healthplatform.healthplatform.visit.entity.Visit;
import com.healthplatform.healthplatform.visit.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MedicalTestService {

    private final MedicalTestRepository medicalTestRepository;
    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final VisitRepository visitRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<MedicalTestResponse> getAllMedicalTests(
            UUID diseaseId,
            UUID visitId,
            TestCategory category
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        long filterCount =
                java.util.stream.Stream.of(
                                diseaseId,
                                visitId,
                                category
                        )
                        .filter(java.util.Objects::nonNull)
                        .count();

        if (filterCount > 1) {
            throw new IllegalArgumentException(
                    "Aynı anda yalnızca bir test filtresi kullanılabilir!"
            );
        }

        List<MedicalTest> tests;

        if (diseaseId != null) {

            resolveDisease(diseaseId, userId);

            tests = medicalTestRepository
                    .findAllByUser_IdAndDisease_IdOrderByTestDateDesc(
                            userId,
                            diseaseId
                    );

        } else if (visitId != null) {

            resolveVisit(visitId, userId);

            tests = medicalTestRepository
                    .findAllByUser_IdAndVisit_IdOrderByTestDateDesc(
                            userId,
                            visitId
                    );

        } else if (category != null) {

            tests = medicalTestRepository
                    .findAllByUser_IdAndCategoryOrderByTestDateDesc(
                            userId,
                            category
                    );

        } else {

            tests = medicalTestRepository
                    .findAllByUser_IdOrderByTestDateDesc(
                            userId
                    );
        }

        return tests
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public MedicalTestResponse getMedicalTest(
            UUID testId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedMedicalTest(
                        testId,
                        userId
                )
        );
    }

    @Transactional
    public MedicalTestResponse createMedicalTest(
            CreateMedicalTestRequest request
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

        MedicalTest medicalTest =
                new MedicalTest();

        medicalTest.setUser(user);
        medicalTest.setDisease(disease);
        medicalTest.setVisit(visit);
        medicalTest.setName(request.name().trim());
        medicalTest.setCategory(request.category());
        medicalTest.setTestDate(request.testDate());

        medicalTest.setLaboratory(
                trimToNull(request.laboratory())
        );

        medicalTest.setNotes(
                trimToNull(request.notes())
        );

        MedicalTest saved =
                medicalTestRepository.save(medicalTest);

        return toResponse(saved);
    }

    @Transactional
    public MedicalTestResponse updateMedicalTest(
            UUID testId,
            UpdateMedicalTestRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        MedicalTest medicalTest =
                findOwnedMedicalTest(
                        testId,
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

        medicalTest.setDisease(disease);
        medicalTest.setVisit(visit);
        medicalTest.setName(request.name().trim());
        medicalTest.setCategory(request.category());
        medicalTest.setTestDate(request.testDate());

        medicalTest.setLaboratory(
                trimToNull(request.laboratory())
        );

        medicalTest.setNotes(
                trimToNull(request.notes())
        );

        return toResponse(medicalTest);
    }

    @Transactional
    public void deleteMedicalTest(
            UUID testId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        MedicalTest medicalTest =
                findOwnedMedicalTest(
                        testId,
                        userId
                );

        medicalTestRepository.delete(medicalTest);
    }

    private MedicalTest findOwnedMedicalTest(
            UUID testId,
            UUID userId
    ) {

        return medicalTestRepository
                .findByIdAndUser_Id(
                        testId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medikal test bulunamadı"
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
                                "Hastalık bulunamadı"
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
                                "Ziyaret bulunamadı"
                        )
                );
    }

    private MedicalTestResponse toResponse(
            MedicalTest medicalTest
    ) {

        Disease disease =
                medicalTest.getDisease();

        Visit visit =
                medicalTest.getVisit();

        return new MedicalTestResponse(
                medicalTest.getId(),

                disease != null
                        ? disease.getId()
                        : null,

                disease != null
                        ? disease.getName()
                        : null,

                visit != null
                        ? visit.getId()
                        : null,

                visit != null
                        ? visit.getVisitDate()
                        : null,

                medicalTest.getName(),
                medicalTest.getCategory(),
                medicalTest.getTestDate(),
                medicalTest.getLaboratory(),
                medicalTest.getNotes(),

                medicalTest.getCreatedAt(),
                medicalTest.getUpdatedAt()
        );
    }

    private String trimToNull(
            String value
    ) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }
}
