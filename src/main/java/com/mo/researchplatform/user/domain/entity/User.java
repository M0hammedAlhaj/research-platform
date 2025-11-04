package com.mo.researchplatform.user.domain.entity;

import com.mo.researchplatform.shared.domain.BaseEntity;
import com.mo.researchplatform.user.domain.model.UserType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "users")
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class User extends BaseEntity {

    private String email;

    private String password;

    protected User() {

    }

    public abstract UserType getType();
}
