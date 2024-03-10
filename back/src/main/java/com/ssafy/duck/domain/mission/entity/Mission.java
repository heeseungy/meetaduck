package com.ssafy.duck.domain.mission.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "`missions`")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`mission_id`", nullable = false, updatable = false)
    private Long missionId;

    @NotNull
    @Column(name = "`mission_content`", nullable = false, updatable = false)
    private String missionContent;

}
