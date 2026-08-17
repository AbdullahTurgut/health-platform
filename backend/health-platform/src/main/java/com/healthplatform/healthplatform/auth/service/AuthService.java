package com.healthplatform.healthplatform.auth.service;

import com.healthplatform.healthplatform.auth.dto.RegisterRequest;
import com.healthplatform.healthplatform.auth.dto.RegisterResponse;
import com.healthplatform.healthplatform.common.exception.ResourceAlreadyExistsException;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthplatform.healthplatform.auth.dto.LoginRequest;
import com.healthplatform.healthplatform.auth.dto.LoginResponse;
import com.healthplatform.healthplatform.security.CustomUserDetails;
import com.healthplatform.healthplatform.security.jwt.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        String normalizedEmail = normalizeEmail(request.email());

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ResourceAlreadyExistsException(
                    "An account with this email already exists"
            );
        }

        User user = new User();

        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());

        user.setEmail(normalizedEmail);

        user.setPasswordHash(
                passwordEncoder.encode(request.password())
        );

        user.setDateOfBirth(request.dateOfBirth());
        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getDateOfBirth(),
                savedUser.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {

        String normalizedEmail = normalizeEmail(request.email());

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                normalizedEmail,
                                request.password()
                        )
                );

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);

        return new LoginResponse(
                token,
                "Bearer",
                3600,
                userDetails.getId(),
                userDetails.getUsername()
        );
    }

    private String normalizeEmail(String email) {
        return email
                .trim()
                .toLowerCase(Locale.ROOT);
    }
}
