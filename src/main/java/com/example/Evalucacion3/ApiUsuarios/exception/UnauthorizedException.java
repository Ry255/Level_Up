package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.http.HttpStatus;

/** 401: credenciales invalidas. */
public class UnauthorizedException extends ApiException {
    public UnauthorizedException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
