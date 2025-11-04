package com.mo.researchplatform.project.ui.rest.create;

import com.mo.researchplatform.project.application.create.CreateProjectCommand;
import com.mo.researchplatform.project.application.create.CreateProjectUseCase;
import com.mo.researchplatform.user.domain.model.UserAuthentication;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/projects")
@Tag(name = "Projects", description = "Endpoints for managing projects")
public class ProjectCreateController {

    private final CreateProjectUseCase createProjectUseCase;

    @Operation(
            summary = "Create a new project",
            description = "Allows an authenticated user to create a new project by providing title, description, and end duration.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Project created successfully",
                            content = @Content(schema = @Schema(implementation = ProjectCreateResponse.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid request or validation failed",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Unauthorized – user not authenticated",
                            content = @Content
                    )
            }
    )
    @PostMapping
    public ResponseEntity<ProjectCreateResponse> invoke(
            @Valid @RequestBody ProjectCreateRequest request,
            @AuthenticationPrincipal UserAuthentication user
    ) {
        var command = new CreateProjectCommand(
                user.user(),
                request.title(),
                request.description(),
                request.endDuration()
        );
        var project = createProjectUseCase.execute(command);
        return ResponseEntity.ok(new ProjectCreateResponse(project));
    }
}
