package com.example.Evalucacion3.ApiUsuarios.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 4, max = 80, message = "El nombre debe tener entre 4 y 80 caracteres")
        String nombre,

        @NotBlank(message = "El correo es obligatorio")
        @Size(max = 120, message = "El correo no puede superar los 120 caracteres")
        @Pattern(regexp = ValidacionUsuario.REGEX_EMAIL, message = ValidacionUsuario.MENSAJE_EMAIL)
        String email,

        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 4, max = 72, message = "La contraseña debe tener entre 4 y 72 caracteres")
        String password) {
}
