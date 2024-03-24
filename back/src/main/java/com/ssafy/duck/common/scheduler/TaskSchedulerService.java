package com.ssafy.duck.common.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

@RequiredArgsConstructor
@Service
public class TaskSchedulerService {
    private final TaskScheduler taskScheduler;
    private final Map<String, ScheduledFuture<?>> scheduledTasks = new HashMap<>();

    public void scheduleTask(String accessCode, Instant endTime) {
        Runnable task = () -> {
            System.out.println("triggered : " + accessCode + " @ " + LocalDateTime.now());
        };

        System.out.println("scheduled : " + accessCode + " @ " + Instant.now());
        ScheduledFuture<?> scheduledFuture = taskScheduler.schedule(task, endTime);
        scheduledTasks.put(accessCode, scheduledFuture);
    }

    public void cancelTask(String accessCode) {
        ScheduledFuture<?> scheduledFuture = scheduledTasks.get(accessCode);
        if (scheduledFuture != null && !scheduledFuture.isCancelled()) {
            scheduledFuture.cancel(true);
            scheduledTasks.remove(accessCode);
            System.out.println("canceled : " + accessCode);
        }
    }
}
