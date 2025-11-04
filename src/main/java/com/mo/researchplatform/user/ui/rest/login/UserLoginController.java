package com.mo.researchplatform.user.ui.rest.login;

import com.mo.researchplatform.shared.infrastructre.jwt.JwtService;
import com.mo.researchplatform.user.application.login.LoginUserCommand;
import com.mo.researchplatform.user.application.login.LoginUserUseCase;
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
@Tag(name = "Authentication", description = "Endpoints for user authentication")
public class UserLoginController {

    private final LoginUserUseCase useCase;
    private final JwtService jwtService;

    @Operation(
            summary = "User login",
            description = "Authenticates the user and returns a JWT access token if credentials are valid.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Login successful – returns JWT token",
                            content = @Content(schema = @Schema(example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."))
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid email or password", content = @Content),
                    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
            }
    )
    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<String> invoke(@Valid @RequestBody UserLoginRequest request) {
        var command = new LoginUserCommand(request.email(), request.password());
        var user = useCase.login(command);
        var token = jwtService.generateToken(user);
        return ResponseEntity.ok(token);
    }
}
