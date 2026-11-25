package com.example.Evalucacion3.ApiUsuarios.service;

import com.example.Evalucacion3.ApiUsuarios.dto.LoginRequest;
import com.example.Evalucacion3.ApiUsuarios.dto.LoginResponse;
import com.example.Evalucacion3.ApiUsuarios.dto.RegistroRequest;
import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioResponse;
import com.example.Evalucacion3.ApiUsuarios.exception.UnauthorizedException;
import com.example.Evalucacion3.ApiUsuarios.model.Rol;
import com.example.Evalucacion3.ApiUsuarios.model.Usuario;
import com.example.Evalucacion3.ApiUsuarios.repository.UsuarioRepository;
import com.example.Evalucacion3.ApiUsuarios.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final String MENSAJE_CREDENCIALES = "Correo o contraseña incorrectos";

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioService usuarioService, UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /** El registro publico siempre crea un CLIENTE; los demas roles los crea un administrador. */
    @Transactional
    public UsuarioResponse registrar(RegistroRequest request) {
        Usuario usuario = usuarioService.crearUsuario(
                request.nombre(), request.email(), request.password(), Rol.CLIENTE);
        return UsuarioResponse.desde(usuario);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new UnauthorizedException(MENSAJE_CREDENCIALES));

        if (!usuario.isActivo() || !passwordEncoder.matches(request.password(), usuario.getPassword())) {
            throw new UnauthorizedException(MENSAJE_CREDENCIALES);
        }
        return LoginResponse.desde(usuario, jwtService.generarToken(usuario));
    }
}
