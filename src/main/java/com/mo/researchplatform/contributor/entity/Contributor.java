package com.mo.researchplatform.contributor.entity;

import com.mo.researchplatform.user.domain.entity.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Table(name = "contributors")
@Entity
@DiscriminatorValue("CONTRIBUTOR")
public class Contributor extends User {
}
