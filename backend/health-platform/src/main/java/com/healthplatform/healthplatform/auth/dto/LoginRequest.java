package com.healthplatform.healthplatform.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Locale;

public record LoginRequest(

        @NotBlank(message = "Email is required")
        @Email(message = "Email format is invalid")
        String email,

        @NotBlank(message = "Password is required")
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
