package com.ssafy.duck.domain.hint.repository;

import com.ssafy.duck.domain.hint.entity.HintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HintStatusRepository  extends JpaRepository<HintStatus, Long> {
}
