package com.healthplatform.healthplatform.doctor.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateDoctorRequest(

        @NotBlank(message = "First name is required")
        @Size(max = 100, message = "First name cannot exceed 100 characters")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 100, message = "Last name cannot exceed 100 characters")
        String lastName,

        @Size(max = 150, message = "Specialization cannot exceed 150 characters")
        String specialization,

        @Size(max = 50, message = "Phone cannot exceed 50 characters")
        String phone,

        @Email(message = "Email format is invalid")
        @Size(max = 255, message = "Email cannot exceed 255 characters")
        String email,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
