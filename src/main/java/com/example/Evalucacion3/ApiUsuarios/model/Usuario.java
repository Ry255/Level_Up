package com.example.Evalucacion3.ApiUsuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USUARIO")
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    /** Hash BCrypt, nunca texto plano. */
    @Column(nullable = false, length = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Rol rol;

    /** Se calcula por el dominio del correo; da el descuento del 20%. */
    @Column(name = "es_duoc", nullable = false)
    private boolean esDuoc = false;

    /** Baja logica. */
    @Column(nullable = false)
    private boolean activo = true;
}
