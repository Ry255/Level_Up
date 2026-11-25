package com.example.Evalucacion3.ApiUsuarios.controller;

import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioCreateRequest;
import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioResponse;
import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioUpdateRequest;
import com.example.Evalucacion3.ApiUsuarios.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** CRUD de usuarios. Solo ADMINISTRADOR (la regla esta en SecurityConfig). */
@RestController
@RequestMapping("/v1/usuarios")
@Tag(name = "Usuarios", description = "Gestión de usuarios y roles (solo Administrador)")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    @Operation(summary = "Lista los usuarios")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios")
    @ApiResponse(responseCode = "401", description = "Sin token o token vencido")
    @ApiResponse(responseCode = "403", description = "El rol no tiene permiso")
    public List<UsuarioResponse> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtiene el detalle de un usuario")
    @ApiResponse(responseCode = "200", description = "Detalle del usuario")
    @ApiResponse(responseCode = "401", description = "Sin token o token vencido")
    @ApiResponse(responseCode = "403", description = "El rol no tiene permiso")
    @ApiResponse(responseCode = "404", description = "No existe el usuario")
    public UsuarioResponse obtener(@PathVariable Long id) {
        return usuarioService.obtener(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crea un usuario indicando su rol")
    @ApiResponse(responseCode = "201", description = "Usuario creado")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @ApiResponse(responseCode = "401", description = "Sin token o token vencido")
    @ApiResponse(responseCode = "403", description = "El rol no tiene permiso")
    @ApiResponse(responseCode = "409", description = "El correo ya está registrado")
    public UsuarioResponse crear(@Valid @RequestBody UsuarioCreateRequest request) {
        return usuarioService.crear(request);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifica los datos o el rol de un usuario")
    @ApiResponse(responseCode = "200", description = "Usuario modificado")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @ApiResponse(responseCode = "401", description = "Sin token o token vencido")
    @ApiResponse(responseCode = "403", description = "El rol no tiene permiso")
    @ApiResponse(responseCode = "404", description = "No existe el usuario")
    @ApiResponse(responseCode = "409", description = "El correo ya está registrado")
    public UsuarioResponse actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioUpdateRequest request) {
        return usuarioService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Da de baja un usuario (activo = false)")
    @ApiResponse(responseCode = "204", description = "Usuario dado de baja")
    @ApiResponse(responseCode = "401", description = "Sin token o token vencido")
    @ApiResponse(responseCode = "403", description = "El rol no tiene permiso")
    @ApiResponse(responseCode = "404", description = "No existe el usuario")
    @ApiResponse(responseCode = "409", description = "Un administrador no puede dar de baja su propia cuenta")
    public void darDeBaja(@PathVariable Long id, Authentication authentication) {
        usuarioService.darDeBaja(id, authentication.getName());
    }
}
