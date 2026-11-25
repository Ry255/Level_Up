package com.example.Evalucacion3.ApiUsuarios.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * Matriz de permisos por rol de TODA la API (Anexo 3, hoja Roles).
 * Las reglas se evaluan en orden: la primera que coincide gana.
 * Lo que no aparece aqui queda solo para ADMINISTRADOR (cierra por defecto).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final String ADMIN = "ADMINISTRADOR";
    private static final String VENDEDOR = "VENDEDOR";
    private static final String CLIENTE = "CLIENTE";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtService jwtService,
                                                   UserDetailsService userDetailsService) throws Exception {
        JwtAuthFilter jwtAuthFilter = new JwtAuthFilter(jwtService, userDetailsService);

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(sesion -> sesion.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Swagger y errores
                        .requestMatchers("/error", "/swagger-ui.html", "/swagger-ui/**",
                                "/v3/api-docs", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Autenticación (registro y login)
                        .requestMatchers("/v1/auth/**").permitAll()

                        // Tienda publica: ver categorias y productos (lista y detalle, v1 y v2)
                        .requestMatchers(HttpMethod.GET,
                                "/v1/categorias", "/v1/categorias/*",
                                "/v1/productos", "/v1/productos/*",
                                "/v2/productos", "/v2/productos/*").permitAll()

                        // Boletas: el cliente compra; vendedor y admin consultan; solo admin modifica
                        .requestMatchers(HttpMethod.POST, "/v1/boletas").hasAnyRole(CLIENTE, ADMIN)
                        .requestMatchers(HttpMethod.GET,
                                "/v1/boletas", "/v1/boletas/**",
                                "/v2/boletas", "/v2/boletas/**").hasAnyRole(ADMIN, VENDEDOR)
                        .requestMatchers("/v1/boletas", "/v1/boletas/**",
                                "/v2/boletas", "/v2/boletas/**").hasRole(ADMIN)

                        // CRUD de categorias, productos y usuarios: solo administrador
                        .requestMatchers("/v1/categorias", "/v1/categorias/**",
                                "/v1/productos", "/v1/productos/**",
                                "/v2/productos", "/v2/productos/**",
                                "/v1/usuarios", "/v1/usuarios/**").hasRole(ADMIN)

                        // Cualquier otra ruta nueva: solo administrador
                        .anyRequest().hasRole(ADMIN))
                .exceptionHandling(ex -> ex
                        // Sin token, vencido o inválido -> 401
                        .authenticationEntryPoint((request, response, authException) ->
                                escribirJson(response, HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized",
                                        "Token ausente, vencido o inválido"))
                        // Token valido pero el rol no tiene permiso -> 403
                        .accessDeniedHandler((request, response, accessDeniedException) ->
                                escribirJson(response, HttpServletResponse.SC_FORBIDDEN, "Forbidden",
                                        "Tu rol no tiene permiso para este recurso")))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /** Permite que el frontend (React en localhost) llame a la API desde otro puerto. */
    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            @Value("${app.cors.allowed-origins}") String[] origenesPermitidos) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(origenesPermitidos));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource fuente = new UrlBasedCorsConfigurationSource();
        fuente.registerCorsConfiguration("/**", config);
        return fuente;
    }

    /** Mismo formato JSON que GlobalExceptionHandler, para que el frontend lea todos los errores igual. */
    private static void escribirJson(HttpServletResponse response, int status, String error, String mensaje)
            throws IOException {
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"timestamp\":\"" + LocalDateTime.now() + "\",\"status\":" + status
                + ",\"error\":\"" + error + "\",\"message\":\"" + mensaje + "\",\"detalles\":[]}");
    }
}
