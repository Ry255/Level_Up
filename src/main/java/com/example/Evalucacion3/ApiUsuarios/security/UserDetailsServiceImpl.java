package com.example.Evalucacion3.ApiUsuarios.security;

import com.example.Evalucacion3.ApiUsuarios.model.Usuario;
import com.example.Evalucacion3.ApiUsuarios.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/** Carga el usuario desde la BD: asi un usuario dado de baja o con rol cambiado se nota al tiro. */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UserDetailsServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return User.withUsername(usuario.getEmail())
                .password(usuario.getPassword())
                .authorities("ROLE_" + usuario.getRol().name())
                .disabled(!usuario.isActivo())
                .build();
    }
}
