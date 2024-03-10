package com.ssafy.duck.domain.hint.repository;

import com.ssafy.duck.domain.hint.entity.Hint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HintRepository extends JpaRepository<Hint, Long> {
}
