package com.mo.researchplatform.admin.domain;

import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.model.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Table(name = "admins")
@Entity
public class Admin extends User {

    @Override
    public UserType getType() {
        return UserType.ADMIN;
    }
}
