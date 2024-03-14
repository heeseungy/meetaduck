package com.ssafy.duck.domain.chat.repository;

import com.ssafy.duck.domain.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRepository extends JpaRepository<Chat, Long> {

//    Chat findByParty_IdAndManitiId(Long partyId, Long manitiId);

    @Query("SELECT c.chatId as chatId FROM Chat c WHERE c.party.partyId = :partyId AND c.manitiId = :manitiId")
    Long findChatIdByPartyIdAndManitiIdCustom(@Param("partyId") Long partyId, @Param("manitiId") Long manitiId);


}
