package com.ssafy.duck.domain.guest.repository;

import com.ssafy.duck.domain.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GuestRepository extends JpaRepository<Guest, Long> {

    Optional<Guest> findById(Long guestId);

    @Query("SELECT guest " +
            "FROM Guest guest " +
            "WHERE guest.party.partyId = :partyId")
    List<Guest> findAllByPartyId(Long partyId);

    @Query("SELECT guest FROM Guest guest " +
            "WHERE guest.user.userId = :userId")
    Optional<Guest> findByUserId(Long userId);

    List<Guest> findByParty_PartyId(Long partyId);

    Optional<Guest> findByUser_UserId(Long userId);

    Optional<Guest> findByManitiId(Long manitiId);
}
