package com.healthplatform.healthplatform.doctor.dto;

import java.time.Instant;
import java.util.UUID;

public record DoctorResponse(

        UUID id,
        String firstName,
        String lastName,
        String specialization,
        String phone,
        String email,
        String notes,
        Instant createdAt,
        Instant updatedAt

) {
}
