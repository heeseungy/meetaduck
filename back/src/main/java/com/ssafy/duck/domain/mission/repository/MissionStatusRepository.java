package com.ssafy.duck.domain.mission.repository;

import com.ssafy.duck.domain.mission.entity.MissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionStatusRepository extends JpaRepository<MissionStatus, Long> {
}
