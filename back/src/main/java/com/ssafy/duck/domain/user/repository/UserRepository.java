package com.ssafy.duck.domain.user.repository;

import com.ssafy.duck.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
