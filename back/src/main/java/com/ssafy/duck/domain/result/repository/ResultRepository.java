package com.ssafy.duck.domain.result.repository;

import com.ssafy.duck.domain.result.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}
