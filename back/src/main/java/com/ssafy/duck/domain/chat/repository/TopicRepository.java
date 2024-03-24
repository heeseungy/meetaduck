package com.ssafy.duck.domain.chat.repository;

import com.ssafy.duck.domain.chat.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    Optional<Topic> findByTopicId(Long topicId);

}
