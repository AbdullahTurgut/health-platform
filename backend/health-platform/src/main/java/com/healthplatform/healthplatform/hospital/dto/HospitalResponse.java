package com.healthplatform.healthplatform.hospital.dto;

import java.time.Instant;
import java.util.UUID;

public record HospitalResponse(

        UUID id,
        String name,
        String city,
        String address,
        String phone,
        String notes,
        Instant createdAt,
        Instant updatedAt

) {
}