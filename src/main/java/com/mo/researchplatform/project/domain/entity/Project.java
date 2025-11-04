package com.mo.researchplatform.project.domain.entity;

import com.mo.researchplatform.contributor.entity.Contributor;
import com.mo.researchplatform.project.domain.exception.InvalidLeaderTypeException;
import com.mo.researchplatform.researchers.entity.Researcher;
import com.mo.researchplatform.shared.domain.BaseEntity;
import com.mo.researchplatform.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "projects")
@Entity
@Getter
@Setter
public class Project extends BaseEntity {

    private String title;

    private String description;

    private LocalDateTime endDuration;

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

    public void addLeader(User user) {
        if (user instanceof Researcher researcher) {
            leader = researcher;
            return;
        }
        throw new InvalidLeaderTypeException("Leader must be a Researcher");
    }
}
