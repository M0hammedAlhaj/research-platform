package com.mo.researchplatform.user.ui.rest.register;

import com.mo.researchplatform.user.domain.model.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRegisterRequest(@Email String email, @NotEmpty @Size(min = 6, max = 24) String password,
                                  @NotNull UserType userType) {

}
