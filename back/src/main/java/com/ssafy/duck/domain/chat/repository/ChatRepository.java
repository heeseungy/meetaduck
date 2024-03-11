package com.ssafy.duck.domain.chat.repository;

import com.ssafy.duck.domain.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
