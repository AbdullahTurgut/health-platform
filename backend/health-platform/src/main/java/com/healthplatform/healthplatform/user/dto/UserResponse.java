package com.healthplatform.healthplatform.user.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record UserResponse(

        UUID id,

        String firstName,

        String lastName,

        String email,

        LocalDate dateOfBirth,

        boolean enabled,

        Instant createdAt,

        Instant updatedAt

) {
}