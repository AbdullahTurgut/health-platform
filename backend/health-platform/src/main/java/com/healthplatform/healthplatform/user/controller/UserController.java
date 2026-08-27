package com.healthplatform.healthplatform.user.controller;

import com.healthplatform.healthplatform.user.dto.UpdateUserRequest;
import com.healthplatform.healthplatform.user.dto.UserResponse;
import com.healthplatform.healthplatform.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {

        return ResponseEntity.ok(
                userService.getCurrentUser()
        );
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUser(

            @Valid
            @RequestBody
            UpdateUserRequest request

    ) {

        return ResponseEntity.ok(
                userService.updateCurrentUser(
                        request
                )
        );
    }
}