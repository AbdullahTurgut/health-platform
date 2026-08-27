package com.healthplatform.healthplatform.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Locale;

public record LoginRequest(

        @NotBlank(message = "E-posta adresi gereklidir")
        @Email(message = "E-posta formatı geçersiz")
        String email,

        @NotBlank(message = "Şifre gereklidir")
        String password

) {

        public LoginRequest {
                if (email != null) {
                        email = email
                                .trim()
                                .toLowerCase(Locale.ROOT);
                }
        }
}
