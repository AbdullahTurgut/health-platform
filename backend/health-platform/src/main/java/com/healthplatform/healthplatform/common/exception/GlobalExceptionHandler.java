package com.healthplatform.healthplatform.common.exception;

import com.healthplatform.healthplatform.common.response.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.core.AuthenticationException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceAlreadyExists(
            ResourceAlreadyExistsException exception,
            HttpServletRequest request
    ) {

        HttpStatus status = HttpStatus.CONFLICT;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFound(
            ResourceNotFoundException exception,
            HttpServletRequest request
    ) {

        HttpStatus status = HttpStatus.NOT_FOUND;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {

        Map<String, String> validationErrors = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(fieldError ->
                        validationErrors.put(
                                fieldError.getField(),
                                fieldError.getDefaultMessage()
                        )
                );

        HttpStatus status = HttpStatus.BAD_REQUEST;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "Validation failed",
                request.getRequestURI(),
                validationErrors
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpectedException(
            Exception exception,
            HttpServletRequest request
    ) {

        log.error(
                "Unhandled exception while processing request: {}",
                request.getRequestURI(),
                exception
        );

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "An unexpected error occurred",
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleDataIntegrityViolation(
            DataIntegrityViolationException exception,
            HttpServletRequest request
    ) {

        log.warn(
                "Data integrity violation while processing request: {}",
                request.getRequestURI()
        );

        HttpStatus status = HttpStatus.CONFLICT;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "The request conflicts with existing data",
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }


    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationException(
            AuthenticationException exception,
            HttpServletRequest request
    ) {

        HttpStatus status = HttpStatus.UNAUTHORIZED;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "Invalid email or password",
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleHttpMessageNotReadable(
            HttpMessageNotReadableException exception,
            HttpServletRequest request
    ) {

        HttpStatus status = HttpStatus.BAD_REQUEST;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "Request body is invalid or contains unsupported values",
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException exception,
            HttpServletRequest request
    ) {

        HttpStatus status = HttpStatus.BAD_REQUEST;

        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                "Request parameter has an invalid value",
                request.getRequestURI(),
                null
        );

        return ResponseEntity
                .status(status)
                .body(response);
    }
}
