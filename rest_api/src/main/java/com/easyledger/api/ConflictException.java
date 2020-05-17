package com.easyledger.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ConflictException extends Exception{

    private static final long serialVersionUID = 1L;

    public ConflictException(String message){
        super(message);
    }
}