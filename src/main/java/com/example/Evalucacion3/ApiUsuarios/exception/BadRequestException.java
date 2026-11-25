package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.http.HttpStatus;

/** 400: datos que no cumplen una regla de negocio. */
public class BadRequestException extends ApiException {
    public BadRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
