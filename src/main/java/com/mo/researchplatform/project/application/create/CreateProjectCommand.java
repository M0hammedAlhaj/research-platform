package com.mo.researchplatform.project.application.create;

import com.mo.researchplatform.user.domain.entity.User;

import java.time.LocalDateTime;

public record CreateProjectCommand(User leader, String title, String description, LocalDateTime endDuration) {
}
