package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

/** Cuerpo JSON unico para todos los errores de la API. */
public record ApiError(String timestamp, int status, String error, String message, List<String> detalles) {

    public static ApiError of(HttpStatus status, String message, List<String> detalles) {
        return new ApiError(LocalDateTime.now().toString(), status.value(), status.getReasonPhrase(), message, detalles);
    }
}
