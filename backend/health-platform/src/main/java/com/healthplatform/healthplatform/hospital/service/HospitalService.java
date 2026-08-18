package com.healthplatform.healthplatform.hospital.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.hospital.dto.CreateHospitalRequest;
import com.healthplatform.healthplatform.hospital.dto.HospitalResponse;
import com.healthplatform.healthplatform.hospital.dto.UpdateHospitalRequest;
import com.healthplatform.healthplatform.hospital.entity.Hospital;
import com.healthplatform.healthplatform.hospital.repository.HospitalRepository;
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
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<HospitalResponse> getAllHospitals(
            String city
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        List<Hospital> hospitals =
                city == null || city.isBlank()
                        ? hospitalRepository
                        .findAllByUser_IdOrderByCreatedAtDesc(userId)
                        : hospitalRepository
                        .findAllByUser_IdAndCityIgnoreCaseOrderByCreatedAtDesc(
                                userId,
                                city.trim()
                        );

        return hospitals
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public HospitalResponse getHospital(UUID hospitalId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedHospital(
                        hospitalId,
                        userId
                )
        );
    }

    @Transactional
    public HospitalResponse createHospital(
            CreateHospitalRequest request
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

        Hospital hospital = new Hospital();

        hospital.setUser(user);
        hospital.setName(request.name().trim());

        hospital.setCity(
                trimToNull(request.city())
        );

        hospital.setAddress(
                trimToNull(request.address())
        );

        hospital.setPhone(
                trimToNull(request.phone())
        );

        hospital.setNotes(
                trimToNull(request.notes())
        );

        Hospital saved =
                hospitalRepository.save(hospital);

        return toResponse(saved);
    }

    @Transactional
    public HospitalResponse updateHospital(
            UUID hospitalId,
            UpdateHospitalRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Hospital hospital =
                findOwnedHospital(
                        hospitalId,
                        userId
                );

        hospital.setName(request.name().trim());

        hospital.setCity(
                trimToNull(request.city())
        );

        hospital.setAddress(
                trimToNull(request.address())
        );

        hospital.setPhone(
                trimToNull(request.phone())
        );

        hospital.setNotes(
                trimToNull(request.notes())
        );

        return toResponse(hospital);
    }

    @Transactional
    public void deleteHospital(UUID hospitalId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Hospital hospital =
                findOwnedHospital(
                        hospitalId,
                        userId
                );

        hospitalRepository.delete(hospital);
    }

    private Hospital findOwnedHospital(
            UUID hospitalId,
            UUID userId
    ) {

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

    private HospitalResponse toResponse(
            Hospital hospital
    ) {

        return new HospitalResponse(
                hospital.getId(),
                hospital.getName(),
                hospital.getCity(),
                hospital.getAddress(),
                hospital.getPhone(),
                hospital.getNotes(),
                hospital.getCreatedAt(),
                hospital.getUpdatedAt()
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
