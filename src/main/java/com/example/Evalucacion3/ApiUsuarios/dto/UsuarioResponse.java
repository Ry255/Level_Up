package com.example.Evalucacion3.ApiUsuarios.dto;

import com.example.Evalucacion3.ApiUsuarios.model.Rol;
import com.example.Evalucacion3.ApiUsuarios.model.Usuario;

/** Nunca incluye la contraseña. */
public record UsuarioResponse(
        Long id,
        String nombre,
        String email,
        Rol rol,
        boolean esDuoc,
        boolean activo) {

    public static UsuarioResponse desde(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getNombre(), usuario.getEmail(),
                usuario.getRol(), usuario.isEsDuoc(), usuario.isActivo());
    }
}
