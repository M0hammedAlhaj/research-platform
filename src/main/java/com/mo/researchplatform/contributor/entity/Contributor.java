package com.mo.researchplatform.contributor.entity;

import com.mo.researchplatform.user.domain.entity.User;
import com.mo.researchplatform.user.domain.model.UserType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Table(name = "contributors")
@Entity
@DiscriminatorValue("CONTRIBUTOR")
public class Contributor extends User {

    @Override
    public UserType getType() {
        return UserType.CONTRIBUTOR;
    }
}
