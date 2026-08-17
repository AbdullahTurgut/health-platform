package com.healthplatform.healthplatform.auth.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record RegisterResponse(

        UUID id,
        String firstName,
        String lastName,
        String email,
        LocalDate dateOfBirth,
        Instant createdAt

) {
}