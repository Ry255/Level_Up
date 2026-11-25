package com.example.Evalucacion3.ApiUsuarios.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiError> manejarApi(ApiException ex) {
        return construir(ex.getStatus(), ex.getMessage(), List.of());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> manejarValidacion(MethodArgumentNotValidException ex) {
        List<String> detalles = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        return construir(HttpStatus.BAD_REQUEST, "Datos inválidos", detalles);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> manejarJsonInvalido(HttpMessageNotReadableException ex) {
        return construir(HttpStatus.BAD_REQUEST,
                "El cuerpo de la petición no es un JSON válido o tiene valores no permitidos (por ejemplo, un rol que no existe)",
                List.of());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> manejarTipoInvalido(MethodArgumentTypeMismatchException ex) {
        return construir(HttpStatus.BAD_REQUEST,
                "El parámetro '" + ex.getName() + "' tiene un formato inválido", List.of());
    }

    /** Red de seguridad: dato duplicado o en uso que se escapo de las validaciones del servicio. */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> manejarIntegridad(DataIntegrityViolationException ex) {
        return construir(HttpStatus.CONFLICT,
                "La operación viola una restricción de la base de datos (dato duplicado o en uso)", List.of());
    }

    private ResponseEntity<ApiError> construir(HttpStatus status, String mensaje, List<String> detalles) {
        return ResponseEntity.status(status).body(ApiError.of(status, mensaje, detalles));
    }
}
