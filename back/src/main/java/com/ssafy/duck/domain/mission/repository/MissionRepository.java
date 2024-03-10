package com.ssafy.duck.domain.mission.repository;

import com.ssafy.duck.domain.mission.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {
}
