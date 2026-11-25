package com.example.Evalucacion3.ApiUsuarios.dto;

import com.example.Evalucacion3.ApiUsuarios.model.Rol;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UsuarioUpdateRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 4, max = 80, message = "El nombre debe tener entre 4 y 80 caracteres")
        String nombre,

        @NotBlank(message = "El correo es obligatorio")
        @Size(max = 120, message = "El correo no puede superar los 120 caracteres")
        @Pattern(regexp = ValidacionUsuario.REGEX_EMAIL, message = ValidacionUsuario.MENSAJE_EMAIL)
        String email,

        @NotNull(message = "El rol es obligatorio (ADMINISTRADOR, VENDEDOR o CLIENTE)")
        Rol rol) {
}
