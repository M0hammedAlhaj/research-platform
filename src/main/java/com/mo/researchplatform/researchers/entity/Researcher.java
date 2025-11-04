package com.mo.researchplatform.researchers.entity;

import com.mo.researchplatform.user.domain.entity.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Table(name = "researchers")
@Entity
@DiscriminatorValue("RESEARCHER")
public class Researcher extends User {
}
