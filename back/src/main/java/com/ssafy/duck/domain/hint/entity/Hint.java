package com.ssafy.duck.domain.hint.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "`hints`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Hint {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`hint_id`", insertable = false, nullable = false, updatable = false)
    private Long hintId;

    @NotNull
    @Column(name = "`hint_content`", insertable = false, nullable = false, updatable = false)
    private String hintContent;

}
