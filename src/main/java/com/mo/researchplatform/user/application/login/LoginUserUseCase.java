package com.mo.researchplatform.user.application.login;

import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.exception.InvalidCredentialsException;
import com.mo.researchplatform.user.domain.repository.UserRepository;
import com.mo.researchplatform.user.domain.service.EncryptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginUserUseCase {

    private final UserRepository userRepository;
    private final EncryptionService passwordEncoder;

    public User login(LoginUserCommand loginUserCommand) {

        final var optionalUser = userRepository.findByEmail(loginUserCommand.email());

        if (optionalUser.isPresent() &&
            passwordEncoder.matchPassword(loginUserCommand.password(), optionalUser.get().getPassword())) {
            return optionalUser.get();
        }

        throw new InvalidCredentialsException("Email or password is invalid");
    }
}
