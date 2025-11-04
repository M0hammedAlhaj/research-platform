package com.mo.researchplatform.project.infrastructre.repostiory;

import com.mo.researchplatform.project.domain.entity.Project;
import com.mo.researchplatform.project.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ProjectRepositoryAdapter implements ProjectRepository {

    private final ProjectRepositoryAdaptee projectRepositoryAdaptee;

    @Override
    public Optional<Project> findById(UUID id) {
        return projectRepositoryAdaptee.findById(id);
    }

    @Override
    public void save(Project project) {
        projectRepositoryAdaptee.save(project);
    }
}
