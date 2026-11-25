package com.example.Evalucacion3.ApiUsuarios.controller;

import com.example.Evalucacion3.ApiUsuarios.dto.LoginRequest;
import com.example.Evalucacion3.ApiUsuarios.dto.LoginResponse;
import com.example.Evalucacion3.ApiUsuarios.dto.RegistroRequest;
import com.example.Evalucacion3.ApiUsuarios.dto.UsuarioResponse;
import com.example.Evalucacion3.ApiUsuarios.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
@Tag(name = "Autenticación", description = "Registro de clientes y login (entrega el token JWT con el rol)")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registra un usuario nuevo con rol CLIENTE")
    @ApiResponse(responseCode = "201", description = "Usuario creado")
    @ApiResponse(responseCode = "400", description = "Datos inválidos (nombre o contraseña de menos de 4 caracteres, correo con dominio no permitido)")
    @ApiResponse(responseCode = "409", description = "El correo ya está registrado")
    public UsuarioResponse registro(@Valid @RequestBody RegistroRequest request) {
        return authService.registrar(request);
    }

    @PostMapping("/login")
    @Operation(summary = "Valida credenciales y entrega el token JWT con el rol")
    @ApiResponse(responseCode = "200", description = "Login correcto: devuelve token, rol y datos del usuario")
    @ApiResponse(responseCode = "400", description = "Falta el correo o la contraseña")
    @ApiResponse(responseCode = "401", description = "Credenciales incorrectas o usuario dado de baja")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
