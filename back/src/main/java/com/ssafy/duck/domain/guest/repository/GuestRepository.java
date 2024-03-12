package com.ssafy.duck.domain.guest.repository;

import com.ssafy.duck.domain.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findAllByPartyPartyId(Long partyId);


}
