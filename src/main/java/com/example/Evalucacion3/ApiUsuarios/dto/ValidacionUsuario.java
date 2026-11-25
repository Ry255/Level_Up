package com.example.Evalucacion3.ApiUsuarios.dto;

/** Reglas de validación de usuario compartidas por los DTO (RN11 del Anexo 3). */
public final class ValidacionUsuario {

    public static final String REGEX_EMAIL =
            "(?i)^[A-Za-z0-9._%+-]+@(gmail\\.com|duocuc\\.cl|profesor\\.duocuc\\.cl)$";

    public static final String MENSAJE_EMAIL =
            "El correo debe ser @gmail.com, @duocuc.cl o @profesor.duocuc.cl";

    private ValidacionUsuario() {
    }
}
