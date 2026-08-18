package com.healthplatform.healthplatform.doctor.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.doctor.dto.CreateDoctorRequest;
import com.healthplatform.healthplatform.doctor.dto.DoctorResponse;
import com.healthplatform.healthplatform.doctor.dto.UpdateDoctorRequest;
import com.healthplatform.healthplatform.doctor.entity.Doctor;
import com.healthplatform.healthplatform.doctor.repository.DoctorRepository;
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
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public List<DoctorResponse> getAllDoctors(
            String specialization
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        List<Doctor> doctors =
                specialization == null || specialization.isBlank()
                        ? doctorRepository
                        .findAllByUser_IdOrderByCreatedAtDesc(userId)
                        : doctorRepository
                        .findAllByUser_IdAndSpecializationIgnoreCaseOrderByCreatedAtDesc(
                                userId,
                                specialization.trim()
                        );

        return doctors
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public DoctorResponse getDoctor(UUID doctorId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        return toResponse(
                findOwnedDoctor(doctorId, userId)
        );
    }

    @Transactional
    public DoctorResponse createDoctor(
            CreateDoctorRequest request
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

        Doctor doctor = new Doctor();

        doctor.setUser(user);
        setDoctorFirstAndLastName(doctor, request.firstName(), request.lastName());

        doctor.setSpecialization(
                trimToNull(request.specialization())
        );

        doctor.setPhone(
                trimToNull(request.phone())
        );

        doctor.setEmail(
                normalizeOptionalEmail(request.email())
        );

        doctor.setNotes(
                trimToNull(request.notes())
        );

        Doctor saved =
                doctorRepository.save(doctor);

        return toResponse(saved);
    }

    private static void setDoctorFirstAndLastName(Doctor doctor, String request, String request1) {
        doctor.setFirstName(request.trim());
        doctor.setLastName(request1.trim());
    }

    @Transactional
    public DoctorResponse updateDoctor(
            UUID doctorId,
            UpdateDoctorRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Doctor doctor =
                findOwnedDoctor(doctorId, userId);

        setDoctorFirstAndLastName(doctor, request.firstName(), request.lastName());

        doctor.setSpecialization(
                trimToNull(request.specialization())
        );

        doctor.setPhone(
                trimToNull(request.phone())
        );

        doctor.setEmail(
                normalizeOptionalEmail(request.email())
        );

        doctor.setNotes(
                trimToNull(request.notes())
        );

        return toResponse(doctor);
    }

    @Transactional
    public void deleteDoctor(UUID doctorId) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        Doctor doctor =
                findOwnedDoctor(doctorId, userId);

        doctorRepository.delete(doctor);
    }

    private Doctor findOwnedDoctor(
            UUID doctorId,
            UUID userId
    ) {

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

    private DoctorResponse toResponse(
            Doctor doctor
    ) {

        return new DoctorResponse(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialization(),
                doctor.getPhone(),
                doctor.getEmail(),
                doctor.getNotes(),
                doctor.getCreatedAt(),
                doctor.getUpdatedAt()
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

    private String normalizeOptionalEmail(
            String email
    ) {

        String normalized =
                trimToNull(email);

        return normalized == null
                ? null
                : normalized.toLowerCase();
    }
}