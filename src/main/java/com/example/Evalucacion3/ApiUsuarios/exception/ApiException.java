package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.http.HttpStatus;

/** Base de los errores de negocio: cada subclase fija el codigo HTTP que devuelve la API. */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
