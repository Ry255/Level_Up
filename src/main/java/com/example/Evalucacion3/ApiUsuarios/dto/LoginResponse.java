package com.example.Evalucacion3.ApiUsuarios.dto;

import com.example.Evalucacion3.ApiUsuarios.model.Rol;
import com.example.Evalucacion3.ApiUsuarios.model.Usuario;

/** Respuesta del login: el frontend guarda el token y usa rol/nombre para mostrar u ocultar vistas. */
public record LoginResponse(
        String token,
        String tipo,
        Long id,
        String nombre,
        String email,
        Rol rol,
        boolean esDuoc) {

    public static LoginResponse desde(Usuario usuario, String token) {
        return new LoginResponse(token, "Bearer", usuario.getId(), usuario.getNombre(),
                usuario.getEmail(), usuario.getRol(), usuario.isEsDuoc());
    }
}
