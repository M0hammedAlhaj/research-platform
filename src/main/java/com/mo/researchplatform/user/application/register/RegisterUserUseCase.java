package com.mo.researchplatform.user.application.register;

import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.factory.UserFactoryProvider;
import com.mo.researchplatform.user.domain.repository.UserRepository;
import com.mo.researchplatform.user.domain.service.EncryptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegisterUserUseCase {

    private final UserRepository userRepository;
    private final EncryptionService passwordEncoder;
    private final UserFactoryProvider userFactoryProvider;

    @Transactional
    public User registerUser(RegisterUserCommand command) {

        if (userRepository.existByEmail(command.email())) {
            String randomPassword = UUID.randomUUID().toString();
            final var hashedPassword = passwordEncoder.encryptPassword(randomPassword);
            return userFactoryProvider.createUser(command.email(),
                    hashedPassword,
                    command.userType());
        }

        final var hashedPassword = passwordEncoder.encryptPassword(command.password());
        var user = userFactoryProvider.createUser(command.email(),
                hashedPassword,
                command.userType());

        userRepository.save(user);
        return user;
    }
}
