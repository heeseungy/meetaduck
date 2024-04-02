package com.ssafy.duck.scheduler;

import com.ssafy.duck.domain.chat.service.ChatService;
import com.ssafy.duck.domain.party.dto.response.PartyRes;
import com.ssafy.duck.domain.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;

@RequiredArgsConstructor
@Service
public class TaskSchedulerService {

    private final TaskScheduler taskScheduler;
    private final ResultService resultService;
    private final ChatService chatService;

    public void scheduleTask(Long partyId, Instant scheduledTime) {
        System.out.println("now schedule  " + scheduledTime);
        Runnable task = () -> {
            resultService.reserveAnalysis(partyId);
            resultService.updateResult(partyId);
        };
        taskScheduler.schedule(task, scheduledTime);
    }

    public void scheduleChatTopic( Instant scheduledTime) {
        System.out.println("chat schedule  " + scheduledTime);
        Runnable chatTask = () -> {
            chatService.sendTopic();
        };
        taskScheduler.schedule(chatTask, scheduledTime);
    }


}
