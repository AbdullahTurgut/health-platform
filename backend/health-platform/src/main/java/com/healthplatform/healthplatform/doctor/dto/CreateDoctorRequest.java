package com.healthplatform.healthplatform.doctor.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateDoctorRequest(

        @NotBlank(message = "Doktor adı zorunludur")
        @Size(
                max = 100,
                message = "Doktor adı en fazla 100 karakter olabilir"
        )
        String firstName,

        @NotBlank(message = "Doktor soyadı zorunludur")
        @Size(
                max = 100,
                message = "Doktor soyadı en fazla 100 karakter olabilir"
        )
        String lastName,

        @Size(
                max = 150,
                message = "Uzmanlık alanı en fazla 150 karakter olabilir"
        )
        String specialization,

        @Size(
                max = 50,
                message = "Telefon numarası en fazla 50 karakter olabilir"
        )
        String phone,

        @Email(
                message = "Geçerli bir e-posta adresi giriniz"
        )
        @Size(
                max = 255,
                message = "E-posta adresi en fazla 255 karakter olabilir"
        )
        String email,

        @Size(
                max = 5000,
                message = "Notlar en fazla 5000 karakter olabilir"
        )
        String notes

) {
}
