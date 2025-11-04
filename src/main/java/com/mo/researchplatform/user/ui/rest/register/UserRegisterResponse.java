package com.mo.researchplatform.user.ui.rest.register;

import com.mo.researchplatform.user.domain.model.UserType;

import java.util.UUID;

public record UserRegisterResponse(UUID id, String email, UserType type) {
}
