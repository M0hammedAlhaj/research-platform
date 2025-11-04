package com.mo.researchplatform.project.application.create;

import com.mo.researchplatform.project.domain.entity.Project;
import com.mo.researchplatform.project.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreateProjectUseCase {

    private final ProjectRepository projectRepository;

    @Transactional
    public Project execute(CreateProjectCommand command) {
        var project = new Project();
        project.setId(UUID.randomUUID());
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());

        project.setTitle(command.title());
        project.setDescription(command.description());
        project.addLeader(command.leader());
        project.setEndDuration(command.endDuration());

        projectRepository.save(project);
        return project;
    }
}
