package com.healthplatform.healthplatform.hospital.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateHospitalRequest(

        @NotBlank(message = "Hospital name is required")
        @Size(max = 200, message = "Hospital name cannot exceed 200 characters")
        String name,

        @Size(max = 100, message = "City cannot exceed 100 characters")
        String city,

        @Size(max = 2000, message = "Address cannot exceed 2000 characters")
        String address,

        @Size(max = 50, message = "Phone cannot exceed 50 characters")
        String phone,

        @Size(max = 5000, message = "Notes cannot exceed 5000 characters")
        String notes

) {
}
