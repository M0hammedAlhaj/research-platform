package com.mo.researchplatform.user.ui.rest.login;

import com.mo.researchplatform.shared.infrastructre.jwt.JwtService;
import com.mo.researchplatform.user.application.login.LoginUserCommand;
import com.mo.researchplatform.user.application.login.LoginUserUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserLoginController {

    private final LoginUserUseCase useCase;
    private final JwtService jwtService;

    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<String> invoke(@Valid @RequestBody UserLoginRequest request) {

        final var command = new LoginUserCommand(request.email(), request.password());
        final var user = useCase.login(command);
        final var token = jwtService.generateToken(user);

        return ResponseEntity.ok(token);
    }
}
