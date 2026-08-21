package com.healthplatform.healthplatform.hospital.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateHospitalRequest(


        @NotBlank(
                message = "Hastane adı zorunludur"
        )
        @Size(
                max = 200,
                message = "Hastane adı en fazla 200 karakter olabilir"
        )
        String name,

        @Size(
                max = 100,
                message = "Şehir en fazla 100 karakter olabilir"
        )
        String city,

        @Size(
                max = 2000,
                message = "Adres en fazla 2000 karakter olabilir"
        )
        String address,

        @Size(
                max = 50,
                message = "Telefon numarası en fazla 50 karakter olabilir"
        )
        String phone,

        @Size(
                max = 5000,
                message = "Notlar en fazla 5000 karakter olabilir"
        )
        String notes

) {
}
