package com.ssafy.duck.domain.guest.repository;

import com.ssafy.duck.domain.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {
}
