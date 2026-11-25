package com.example.Evalucacion3.ApiUsuarios.security;

import com.example.Evalucacion3.ApiUsuarios.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/** Genera y valida los tokens JWT (HS256). */
@Service
public class JwtService {

    private final SecretKey key;
    private final long expiracionMillis;

    public JwtService(@Value("${jwt.secret}") String secreto,
                      @Value("${jwt.expiration-minutes}") long minutos) {
        byte[] bytes = secreto.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException("app.jwt.secret debe tener al menos 32 caracteres");
        }
        this.key = Keys.hmacShaKeyFor(bytes);
        this.expiracionMillis = minutos * 60_000L;
    }

    public String generarToken(Usuario usuario) {
        Date ahora = new Date();
        return Jwts.builder()
                .subject(usuario.getEmail())
                .claim("id", usuario.getId())
                .claim("nombre", usuario.getNombre())
                .claim("rol", usuario.getRol().name())
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime() + expiracionMillis))
                .signWith(key)
                .compact();
    }

    /** Lanza JwtException si el token esta vencido, mal firmado o mal formado. */
    public Claims validar(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
