package com.healthplatform.healthplatform.medicaltest.repository;

import com.healthplatform.healthplatform.medicaltest.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TestResultRepository
        extends JpaRepository<TestResult, UUID> {

    List<TestResult> findAllByMedicalTest_Id(UUID medicalTestId);

    List<TestResult> findAllByMedicalTest_IdOrderByParameterNameAsc(
            UUID medicalTestId
    );

    Optional<TestResult> findByIdAndMedicalTest_User_Id(
            UUID id,
            UUID userId
    );

    List<TestResult> findAllByMedicalTest_User_IdAndParameterNameIgnoreCaseOrderByMedicalTest_TestDateDesc(
            UUID userId,
            String parameterName
    );
}
