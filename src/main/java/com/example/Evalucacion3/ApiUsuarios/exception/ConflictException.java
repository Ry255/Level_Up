package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.http.HttpStatus;

/** 409: choca con el estado actual (correo repetido, stock insuficiente, etc.). */
public class ConflictException extends ApiException {
    public ConflictException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
