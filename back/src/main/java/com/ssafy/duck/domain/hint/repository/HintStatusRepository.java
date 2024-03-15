package com.ssafy.duck.domain.hint.repository;

import com.ssafy.duck.domain.hint.entity.HintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HintStatusRepository extends JpaRepository<HintStatus, Long> {
    List<HintStatus> findAllByGuestGuestId(Long guestId);

    HintStatus findByGuestGuestIdAndHintHintId(Long guestId, Long hintId);
}
