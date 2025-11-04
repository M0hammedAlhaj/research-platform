package com.mo.researchplatform.user.ui.rest.shared;

import com.mo.researchplatform.shared.controller.StandardErrorResponse;
import com.mo.researchplatform.user.domain.exception.InvalidCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<StandardErrorResponse> handleInvalidCredentials(InvalidCredentialsException ex) {
        StandardErrorResponse response = StandardErrorResponse.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
