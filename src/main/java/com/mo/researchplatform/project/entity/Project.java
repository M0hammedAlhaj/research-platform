package com.mo.researchplatform.project.entity;

import com.mo.researchplatform.contributor.entity.Contributor;
import com.mo.researchplatform.researchers.entity.Researcher;
import com.mo.researchplatform.shared.domain.BaseEntity;
import jakarta.persistence.*;

import java.util.Set;

@Table(name = "projects")
@Entity
public class Project extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "leader_id", referencedColumnName = "id")
    private Researcher leader;

    @ManyToMany
    @JoinTable(
            name = "projects_members",
            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "member_id", referencedColumnName = "id")
    )
    private Set<Contributor> members;
}
