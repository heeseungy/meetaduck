package com.ssafy.duck.scheduler;

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

    public void scheduleTask(Long partyId, Instant scheduledTime) {
        Runnable task = () -> {
            resultService.reserveAnalysis(partyId);
        };
        taskScheduler.schedule(task, scheduledTime);
    }
}
