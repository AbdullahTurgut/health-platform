package com.healthplatform.healthplatform.medicaltest.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.medicaltest.dto.CreateTestResultRequest;
import com.healthplatform.healthplatform.medicaltest.dto.TestResultResponse;
import com.healthplatform.healthplatform.medicaltest.dto.UpdateTestResultRequest;
import com.healthplatform.healthplatform.medicaltest.entity.MedicalTest;
import com.healthplatform.healthplatform.medicaltest.entity.TestResult;
import com.healthplatform.healthplatform.medicaltest.repository.MedicalTestRepository;
import com.healthplatform.healthplatform.medicaltest.repository.TestResultRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TestResultService {

    private final TestResultRepository testResultRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<TestResultResponse> getResultsForMedicalTest(
            UUID medicalTestId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        findOwnedMedicalTest(
                medicalTestId,
                userId
        );

        return testResultRepository
                .findAllByMedicalTest_IdOrderByParameterNameAsc(
                        medicalTestId
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TestResultResponse getTestResult(
            UUID resultId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedTestResult(
                        resultId,
                        userId
                )
        );
    }

    @Transactional(readOnly = true)
    public List<TestResultResponse> getParameterHistory(
            String parameterName
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        String normalizedParameter =
                parameterName == null
                        ? null
                        : parameterName.trim();

        if (
                normalizedParameter == null
                        || normalizedParameter.isBlank()
        ) {
            throw new IllegalArgumentException(
                    "Parameter name is required"
            );
        }

        return testResultRepository
                .findAllByMedicalTest_User_IdAndParameterNameIgnoreCaseOrderByMedicalTest_TestDateDesc(
                        userId,
                        normalizedParameter
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public TestResultResponse createTestResult(
            UUID medicalTestId,
            CreateTestResultRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        MedicalTest medicalTest =
                findOwnedMedicalTest(
                        medicalTestId,
                        userId
                );

        TestResult result =
                new TestResult();

        result.setMedicalTest(medicalTest);

        applyValues(
                result,
                request.parameterName(),
                request.valueText(),
                request.numericValue(),
                request.unit(),
                request.referenceRange(),
                request.flag(),
                request.notes()
        );

        TestResult saved =
                testResultRepository.save(result);

        return toResponse(saved);
    }

    @Transactional
    public TestResultResponse updateTestResult(
            UUID resultId,
            UpdateTestResultRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        TestResult result =
                findOwnedTestResult(
                        resultId,
                        userId
                );

        applyValues(
                result,
                request.parameterName(),
                request.valueText(),
                request.numericValue(),
                request.unit(),
                request.referenceRange(),
                request.flag(),
                request.notes()
        );

        return toResponse(result);
    }

    @Transactional
    public void deleteTestResult(
            UUID resultId
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        TestResult result =
                findOwnedTestResult(
                        resultId,
                        userId
                );

        testResultRepository.delete(result);
    }

    private MedicalTest findOwnedMedicalTest(
            UUID medicalTestId,
            UUID userId
    ) {

        return medicalTestRepository
                .findByIdAndUser_Id(
                        medicalTestId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical test not found"
                        )
                );
    }

    private TestResult findOwnedTestResult(
            UUID resultId,
            UUID userId
    ) {

        return testResultRepository
                .findByIdAndMedicalTest_User_Id(
                        resultId,
                        userId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Test result not found"
                        )
                );
    }

    private void applyValues(
            TestResult result,
            String parameterName,
            String valueText,
            java.math.BigDecimal numericValue,
            String unit,
            String referenceRange,
            com.healthplatform.healthplatform.medicaltest.model.ResultFlag flag,
            String notes
    ) {

        result.setParameterName(
                parameterName.trim()
        );

        result.setValueText(
                valueText.trim()
        );

        result.setNumericValue(
                numericValue
        );

        result.setUnit(
                trimToNull(unit)
        );

        result.setReferenceRange(
                trimToNull(referenceRange)
        );

        result.setFlag(
                flag
        );

        result.setNotes(
                trimToNull(notes)
        );
    }

    private TestResultResponse toResponse(
            TestResult result
    ) {

        MedicalTest medicalTest =
                result.getMedicalTest();

        return new TestResultResponse(
                result.getId(),

                medicalTest.getId(),
                medicalTest.getName(),
                medicalTest.getTestDate(),

                result.getParameterName(),
                result.getValueText(),
                result.getNumericValue(),
                result.getUnit(),
                result.getReferenceRange(),
                result.getFlag(),
                result.getNotes(),

                result.getCreatedAt(),
                result.getUpdatedAt()
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
}
