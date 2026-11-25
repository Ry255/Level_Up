package com.example.Evalucacion3.ApiUsuarios.config;

import com.example.Evalucacion3.ApiUsuarios.model.Rol;
import com.example.Evalucacion3.ApiUsuarios.repository.UsuarioRepository;
import com.example.Evalucacion3.ApiUsuarios.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/** Si la tabla USUARIO esta vacia, crea un usuario de cada rol para poder probar al tiro. */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;

    public DataInitializer(UsuarioRepository usuarioRepository, UsuarioService usuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() > 0) {
            return;
        }
        usuarioService.crearUsuario("Administrador", "admin@gmail.com", "admin1234", Rol.ADMINISTRADOR);
        usuarioService.crearUsuario("Vendedor Demo", "vendedor@gmail.com", "vendedor1234", Rol.VENDEDOR);
        usuarioService.crearUsuario("Cliente Demo", "cliente@gmail.com", "cliente1234", Rol.CLIENTE);
        usuarioService.crearUsuario("Cliente Duoc", "duoc@duocuc.cl", "duoc1234", Rol.CLIENTE);
        log.info("Usuarios de prueba creados (admin@gmail.com, vendedor@gmail.com, cliente@gmail.com, duoc@duocuc.cl)");
    }
}
