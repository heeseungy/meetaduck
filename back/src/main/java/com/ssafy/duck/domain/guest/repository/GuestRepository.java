package com.ssafy.duck.domain.guest.repository;

import com.ssafy.duck.domain.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findAllByPartyPartyId(Long partyId);
    List<Guest> findByParty_PartyId(Long partyId);

    Optional<Guest> findByUser_UserId(Long userId);
}
