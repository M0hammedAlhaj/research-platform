package com.mo.researchplatform.user.domain.repository;

import com.mo.researchplatform.shared.domain.BaseRepository;
import com.mo.researchplatform.user.domain.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends BaseRepository<User, UUID> {

    boolean existByEmail(String email);

    Optional<User> findByEmail(String email);
}
