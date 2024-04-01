package com.ssafy.duck.domain.result.repository;

import com.ssafy.duck.domain.result.dto.model.FavorabilityProjection;
import com.ssafy.duck.domain.result.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Long> {

    @Query("SELECT " +
            "result.manitoFavorability AS manitoFavorability, " +
            "result.manitiFavorability AS manitiFavorability " +
            "FROM Result result " +
            "WHERE result.guest.guestId = :guestId")
    Optional<FavorabilityProjection> findFavorabilityByGuestId(Long guestId);

    Result findByGuestGuestId(Long guestId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Result r WHERE r.guest.guestId = :guestId")
    Integer deleteResultByGuestID(Long guestId);

    Integer deleteAllByGuestPartyPartyId(Long partyId);
    int countByGuestPartyPartyId(Long partyId);
}
