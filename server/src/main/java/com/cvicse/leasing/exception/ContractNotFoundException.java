package com.cvicse.leasing.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "ContractRequest Not Found")
public class ContractNotFoundException extends Exception {
    private static final long serialVersionUID = 1L;

    public ContractNotFoundException(String errorMessage) {
        super(errorMessage);
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }
}