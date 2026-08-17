package com.healthplatform.healthplatform.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CurrentUserProvider {

    public CustomUserDetails getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (
                authentication == null
                        || !(authentication.getPrincipal()
                        instanceof CustomUserDetails userDetails)
        ) {
            throw new IllegalStateException(
                    "Authenticated user is not available"
            );
        }

        return userDetails;
    }

    public UUID getCurrentUserId() {
        return getCurrentUser().getId();
    }
}