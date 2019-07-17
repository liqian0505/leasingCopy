package com.cvicse.leasing.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Template Not Found")
public class TemplateNotFoundException extends Exception {
    private static final long serialVersionUID = 1L;

    public TemplateNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}