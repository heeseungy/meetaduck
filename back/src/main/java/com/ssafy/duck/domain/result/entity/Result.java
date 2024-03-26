package com.ssafy.duck.domain.result.entity;

import com.ssafy.duck.domain.guest.entity.Guest;
import jakarta.persistence.*;
import lombok.*;

import javax.annotation.Nullable;

@Entity
@Table(name = "`results`")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@ToString
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`result_id`", insertable = false, nullable = false, updatable = false)
    private Long resultId;

    @Nullable
    @Column(name = "`manito_favorability`")
    private Integer manitoFavorability;

    @Nullable
    @Column(name = "`maniti_favorability`")
    private Integer manitiFavorability;

    @Nullable
    @Column(name = "`manito_wordcount`")
    private String manitoWordcount;

    @Nullable
    @Column(name = "`maniti_wordcount`")
    private String manitiWordcount;


    @Nullable
    @Column(name = "`manito_ratio`")
    private Integer manitoRatio;

    @Nullable
    @Column(name = "`maniti_ratio`")
    private Integer manitiRatio;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "`guest_id`", nullable = false, updatable = false)
    private Guest guest;

}
