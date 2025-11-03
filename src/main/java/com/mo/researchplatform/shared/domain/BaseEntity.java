package com.mo.researchplatform.shared.domain;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {

    @Id
    private UUID id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
