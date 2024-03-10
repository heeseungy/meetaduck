package com.ssafy.duck.domain.hint.entity;

import com.ssafy.duck.domain.guest.entity.Guest;
import jakarta.persistence.*;
import lombok.*;

import javax.annotation.Nullable;

@Entity
@Table(name = "`hint_status`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class HintStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`hint_status_id`", nullable = false, updatable = false)
    private Long hintStatusId;

    @Nullable
    @Column(name = "`hint_status_answer`")
    private String hintStatusAnswer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`hint_id`", nullable = false, updatable = false)
    private Hint hint;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "guest_id", nullable = false, updatable = false)
    private Guest guest;

}
