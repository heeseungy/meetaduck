package com.ssafy.duck.domain.chat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "`topics`")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`topic_id`", nullable = false, updatable = false)
    private Long topicId;

    @NotNull
    @Column(name = "`topic_content`", insertable = false, nullable = false, updatable = false)
    private String topicConent;

}
