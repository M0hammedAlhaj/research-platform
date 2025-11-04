package com.mo.researchplatform.project.infrastructre.repostiory;

import com.mo.researchplatform.project.domain.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProjectRepositoryAdaptee extends JpaRepository<Project, UUID> {
}
