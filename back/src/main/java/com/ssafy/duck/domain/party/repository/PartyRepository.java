package com.ssafy.duck.domain.party.repository;

import com.ssafy.duck.domain.party.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepository extends JpaRepository<Party, Long> {
}
