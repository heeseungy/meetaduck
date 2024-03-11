package com.ssafy.duck.domain.hint.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "`hints`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Slf4j // 로깅
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
