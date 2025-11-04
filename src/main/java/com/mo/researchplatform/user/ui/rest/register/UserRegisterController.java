package com.mo.researchplatform.user.ui.rest.register;

import com.mo.researchplatform.user.application.register.RegisterUserCommand;
import com.mo.researchplatform.user.application.register.RegisterUserUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserRegisterController {

    private final RegisterUserUseCase registerUserUseCase;

    @PostMapping("/api/v1/auth/register")
    public ResponseEntity<UserRegisterResponse> invoke(@Valid @RequestBody UserRegisterRequest request) {

        final var command = new RegisterUserCommand(request.email(), request.password(), request.userType());
        final var user = registerUserUseCase.registerUser(command);
        final var response = new UserRegisterResponse(user.getId(), user.getEmail(), user.getEmail(), user.getType());

        return ResponseEntity.ok(response);
    }
}
