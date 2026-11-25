package com.example.Evalucacion3.ApiUsuarios.service;

import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioCreateRequest;
import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioResponse;
import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioUpdateRequest;
import com.example.Evalucacion3.ApiUsuarios.exception.ConflictException;
import com.example.Evalucacion3.ApiUsuarios.exception.NotFoundException;
import com.example.Evalucacion3.ApiUsuarios.model.Rol;
import com.example.Evalucacion3.ApiUsuarios.model.Usuario;
import com.example.Evalucacion3.ApiUsuarios.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll().stream().map(UsuarioResponse::desde).toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtener(Long id) {
        return UsuarioResponse.desde(buscar(id));
    }

    @Transactional
    public UsuarioResponse crear(UsuarioCreateRequest request) {
        Usuario usuario = crearUsuario(request.nombre(), request.email(), request.password(), request.rol());
        return UsuarioResponse.desde(usuario);
    }

    /** Usado por POST /v1/usuarios, por el registro publico (siempre CLIENTE) y por los datos iniciales. */
    @Transactional
    public Usuario crearUsuario(String nombre, String email, String password, Rol rol) {
        String correo = normalizar(email);
        if (usuarioRepository.existsByEmailIgnoreCase(correo)) {
            throw new ConflictException("El correo ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre.trim());
        usuario.setEmail(correo);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setRol(rol);
        usuario.setEsDuoc(esCorreoDuoc(correo));
        usuario.setActivo(true);
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public UsuarioResponse actualizar(Long id, UsuarioUpdateRequest request) {
        Usuario usuario = buscar(id);
        String correo = normalizar(request.email());
        if (usuarioRepository.existsByEmailIgnoreCaseAndIdNot(correo, id)) {
            throw new ConflictException("El correo ya está registrado");
        }
        usuario.setNombre(request.nombre().trim());
        usuario.setEmail(correo);
        usuario.setRol(request.rol());
        usuario.setEsDuoc(esCorreoDuoc(correo));
        return UsuarioResponse.desde(usuarioRepository.save(usuario));
    }

    /** Baja logica (RN12). Un administrador no puede dar de baja su propia cuenta (RN14). */
    @Transactional
    public void darDeBaja(Long id, String emailSolicitante) {
        Usuario usuario = buscar(id);
        if (usuario.getEmail().equalsIgnoreCase(emailSolicitante)) {
            throw new ConflictException("No puedes dar de baja tu propia cuenta");
        }
        usuario.setActivo(false);
        usuarioRepository.save(usuario);
    }

    /** RN06: el descuento del 20% aplica a correos @duocuc.cl y @profesor.duocuc.cl. */
    public static boolean esCorreoDuoc(String email) {
        String correo = email.toLowerCase(Locale.ROOT);
        return correo.endsWith("@duocuc.cl") || correo.endsWith("@profesor.duocuc.cl");
    }

    private Usuario buscar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("No existe el usuario con id " + id));
    }

    private String normalizar(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
