# Evalucacion3.ApiUsuarios – API REST de la tienda (DSY1104)

Backend Spring Boot 4 (Java 21) + MySQL + Spring Security con JWT y roles.

## Cómo correrlo
1. Tener MySQL andando (puerto 3306). La BD `tienda_db` se crea sola.
2. Si tu MySQL tiene contraseña: `DB_PASSWORD=tuclave` (variable de entorno). Usuario por defecto: `root`.
3. En la carpeta del proyecto: `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`).
4. Swagger: http://localhost:8080/swagger-ui.html

Variables opcionales: `DB_URL`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET` (mín. 32 caracteres), `JWT_EXPIRATION_MINUTES`, `CORS_ORIGINS`.
No subir claves reales a GitHub (los repos son públicos).

## Usuarios de prueba (se crean solos si la tabla USUARIO está vacía)
| Correo | Contraseña | Rol |
|---|---|---|
| admin@gmail.com | admin1234 | ADMINISTRADOR |
| vendedor@gmail.com | vendedor1234 | VENDEDOR |
| cliente@gmail.com | cliente1234 | CLIENTE |
| duoc@duocuc.cl | duoc1234 | CLIENTE (es_duoc = true, 20% dcto.) |

## Probar el login en Swagger
1. `POST /v1/auth/login` con `{"email":"admin@gmail.com","password":"admin1234"}`.
2. Copiar el `token` de la respuesta.
3. Botón **Authorize** (arriba a la derecha) → pegar solo el token → Authorize.
4. Probar `GET /v1/usuarios` (200 con admin; 403 con vendedor; 401 sin token).

## Permisos por rol (todo está en `security/SecurityConfig.java`)
| Recurso | Público | Cliente | Vendedor | Administrador |
|---|---|---|---|---|
| `/v1/auth/**` | sí | sí | sí | sí |
| GET categorías y productos (v1/v2) | sí | sí | sí | sí |
| POST/PUT/DELETE categorías y productos | no | no | no | sí |
| `/v1/usuarios/**` | no | no | no | sí |
| POST `/v1/boletas` | no | sí | no | sí |
| GET boletas (v1/v2) | no | no | sí | sí |
| PUT/DELETE boletas | no | no | no | sí |

Una ruta nueva que no esté en la tabla queda solo para ADMINISTRADOR hasta que se agregue su regla.

## Para el resto del equipo
- **Integrante 2:** usar `NotFoundException`, `ConflictException`, `BadRequestException` (paquete `exception`): el `GlobalExceptionHandler` los convierte en 404/409/400 con el mismo JSON. Los servicios de Categoría, Producto y Boleta tienen solo lo básico; las reglas RN01–RN10 van encima. No devolver entidades desde los controladores, usar DTO (evita recursión Boleta ↔ Detalle). `AuthController` y `UsuarioController` ya están hechos.
- **Integrante 3:** el login devuelve `token`, `rol`, `nombre`, `email`, `id`, `esDuoc`. Enviar `Authorization: Bearer <token>` y guardar token + datos para sobrevivir al F5. Un 401 significa token ausente o vencido; un 403, rol sin permiso.
