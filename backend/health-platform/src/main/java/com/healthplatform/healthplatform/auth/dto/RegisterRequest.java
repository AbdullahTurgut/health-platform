package com.healthplatform.healthplatform.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

public record RegisterRequest(

        @NotBlank(message = "Adının belirtilmesi zorunludur")
        @Size(max = 100, message = "İsim 100 karakteri geçemez")
        String firstName,

        @NotBlank(message = "Soyad belirtilmesi zorunludur")
        @Size(max = 100, message = "Soyadı 100 karakteri geçemez")
        String lastName,

        @NotBlank(message = "E-posta adresi gereklidir")
        @Email(message = "E-posta formatı geçersiz")
        @Size(max = 255, message = "E-posta 255 karakteri geçemez")
        String email,

        @NotBlank(message = "Şifre gereklidir")
        @Size(
                min = 8,
                max = 72,
                message = "Parola 8 ile 72 karakter arasında olmalıdır"
        )
        String password,

        @Past(message = "Doğum tarihi geçmiş bir tarih olmalıdır")
        LocalDate dateOfBirth

) {
}
