package com.healthplatform.healthplatform.disease.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.disease.dto.CreateDiseaseRequest;
import com.healthplatform.healthplatform.disease.dto.DiseaseResponse;
import com.healthplatform.healthplatform.disease.dto.UpdateDiseaseRequest;
import com.healthplatform.healthplatform.disease.entity.Disease;
import com.healthplatform.healthplatform.disease.model.DiseaseStatus;
import com.healthplatform.healthplatform.disease.repository.DiseaseRepository;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;



    @Transactional(readOnly = true)
    public List<DiseaseResponse> getAllDiseases(
            DiseaseStatus status
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        List<Disease> diseases =
                status == null
                        ? diseaseRepository
                        .findAllByUser_IdOrderByCreatedAtDesc(userId)
                        : diseaseRepository
                        .findAllByUser_IdAndStatusOrderByCreatedAtDesc(
                                userId,
                                status
                        );

        return diseases
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public DiseaseResponse getDisease(UUID diseaseId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Disease disease = findOwnedDisease(
                diseaseId,
                userId
        );

        return toResponse(disease);
    }

    @Transactional
    public DiseaseResponse createDisease(
            CreateDiseaseRequest request
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

        Disease disease = new Disease();

        disease.setUser(user);
        disease.setName(request.name().trim());
        disease.setDiagnosisDate(
                request.diagnosisDate()
        );
        disease.setStatus(
                request.status() != null
                        ? request.status()
                        : DiseaseStatus.ACTIVE
        );
        disease.setDescription(
                request.description()
        );

        Disease saved =
                diseaseRepository.save(disease);

        return toResponse(saved);
    }

    @Transactional
    public DiseaseResponse updateDisease(
            UUID diseaseId,
            UpdateDiseaseRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Disease disease = findOwnedDisease(
                diseaseId,
                userId
        );

        disease.setName(request.name().trim());
        disease.setDiagnosisDate(
                request.diagnosisDate()
        );
        disease.setStatus(
                request.status()
        );
        disease.setDescription(
                request.description()
        );

        return toResponse(disease);
    }

    @Transactional
    public void deleteDisease(UUID diseaseId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Disease disease = findOwnedDisease(
                diseaseId,
                userId
        );

        diseaseRepository.delete(disease);
    }

    private Disease findOwnedDisease(
            UUID diseaseId,
            UUID userId
    ) {

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

    private DiseaseResponse toResponse(
            Disease disease
    ) {

        return new DiseaseResponse(
                disease.getId(),
                disease.getName(),
                disease.getDiagnosisDate(),
                disease.getStatus(),
                disease.getDescription(),
                disease.getCreatedAt(),
                disease.getUpdatedAt()
        );
    }
}
