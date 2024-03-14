package com.ssafy.duck.domain.mission.repository;

import com.ssafy.duck.domain.mission.entity.MissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface MissionStatusRepository extends JpaRepository<MissionStatus, Long> {
    List<MissionStatus> findAllByGuestGuestIdAndGetTimeBefore(Long guestId, Instant today);

    List<MissionStatus> findByGuestGuestIdOrderByGetTime(Long guestId);
}
