package com.healthplatform.healthplatform.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UpdateUserRequest(

        @NotBlank(message = "Ad zorunludur")
        @Size(
                max = 100,
                message = "Ad en fazla 100 karakter olabilir"
        )
        String firstName,

        @NotBlank(message = "Soyad zorunludur")
        @Size(
                max = 100,
                message = "Soyad en fazla 100 karakter olabilir"
        )
        String lastName,

        @PastOrPresent(
                message = "Doğum tarihi gelecekte olamaz"
        )
        LocalDate dateOfBirth

) {
}