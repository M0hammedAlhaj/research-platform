package com.mo.researchplatform.project.ui.rest.create;

import com.mo.researchplatform.project.domain.entity.Project;

import java.time.LocalDateTime;

public class ProjectCreateResponse {

    private final String id;
    private final String title;
    private final String description;
    private final LocalDateTime endDuration;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public ProjectCreateResponse(Project project) {
        id = project.getId().toString();
        title = project.getTitle();
        description = project.getDescription();
        endDuration = project.getEndDuration();
        createdAt = project.getCreatedAt();
        updatedAt = project.getUpdatedAt();
    }
}
