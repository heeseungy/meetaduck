package com.ssafy.duck.domain.party.exception;

import org.zalando.problem.AbstractThrowableProblem;

public class PartyException extends AbstractThrowableProblem {

    public PartyException(PartyErrorCode errorCode) {
        super(
                null,
                errorCode.getStatus().name(),
                errorCode.getStatus(),
                errorCode.getDetail()
        );
    }

}
