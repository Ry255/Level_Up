package com.example.Evalucacion3.ApiUsuarios.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Agrega el boton "Authorize" de Swagger para pegar el token JWT y probar endpoints protegidos.
 * Es un customizer (no un bean OpenAPI), asi no choca con la config de titulo/descripcion del integrante 2.
 */
@Configuration
public class SwaggerSecurityConfig {

    public static final String ESQUEMA_JWT = "bearerAuth";

    @Bean
    public OpenApiCustomizer jwtSecurityCustomizer() {
        return openApi -> {
            Components components = openApi.getComponents() != null ? openApi.getComponents() : new Components();
            components.addSecuritySchemes(ESQUEMA_JWT, new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT"));
            openApi.setComponents(components);
            openApi.addSecurityItem(new SecurityRequirement().addList(ESQUEMA_JWT));
        };
    }
}
