package com.healthplatform.healthplatform.user.service;

import com.healthplatform.healthplatform.common.exception.ResourceNotFoundException;
import com.healthplatform.healthplatform.security.CurrentUserProvider;
import com.healthplatform.healthplatform.user.dto.UpdateUserRequest;
import com.healthplatform.healthplatform.user.dto.UserResponse;
import com.healthplatform.healthplatform.user.entity.User;
import com.healthplatform.healthplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final CurrentUserProvider currentUserProvider;

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        User user =
                getUserOrThrow(userId);

        return toResponse(user);
    }

    @Transactional
    public UserResponse updateCurrentUser(
            UpdateUserRequest request
    ) {

        UUID userId =
                currentUserProvider.getCurrentUserId();

        User user =
                getUserOrThrow(userId);

        user.setFirstName(
                request.firstName().trim()
        );

        user.setLastName(
                request.lastName().trim()
        );

        user.setDateOfBirth(
                request.dateOfBirth()
        );

        User savedUser =
                userRepository.save(user);

        return toResponse(savedUser);
    }

    private User getUserOrThrow(
            UUID userId
    ) {

        return userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Kullanıcı bulunamadı"
                        )
                );
    }

    private UserResponse toResponse(
            User user
    ) {

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getDateOfBirth(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}