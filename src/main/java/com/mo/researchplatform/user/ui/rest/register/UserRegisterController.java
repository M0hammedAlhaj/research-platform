package com.mo.researchplatform.user.ui.rest.register;

import com.mo.researchplatform.user.application.register.RegisterUserCommand;
import com.mo.researchplatform.user.application.register.RegisterUserUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class UserRegisterController {

    private final RegisterUserUseCase registerUserUseCase;

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user account with email, password, and user type.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "User registered successfully",
                            content = @Content(schema = @Schema(implementation = UserRegisterResponse.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid input or validation failed",
                            content = @Content
                    )
            }
    )
    @PostMapping("/api/v1/auth/register")
    public ResponseEntity<UserRegisterResponse> invoke(@Valid @RequestBody UserRegisterRequest request) {

        var command = new RegisterUserCommand(
                request.email(),
                request.password(),
                request.userType()
        );

        var user = registerUserUseCase.registerUser(command);

        var response = new UserRegisterResponse(
                user.getId(),
                user.getEmail(),
                user.getType()
        );

        return ResponseEntity.ok(response);
    }
}
