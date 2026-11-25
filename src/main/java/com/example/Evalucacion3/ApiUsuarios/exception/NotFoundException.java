package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.http.HttpStatus;

/** 404: no existe el recurso pedido. */
public class NotFoundException extends ApiException {
    public NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
