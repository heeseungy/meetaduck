package com.ssafy.duck.domain.chat.exception;

import org.zalando.problem.AbstractThrowableProblem;

public class ChatException extends AbstractThrowableProblem {

    public ChatException(ChatErrorCode errorCode) {
        super(
                null,
                errorCode.getStatus().name(),
                errorCode.getStatus(),
                errorCode.getDetail()
        );
    }

}

