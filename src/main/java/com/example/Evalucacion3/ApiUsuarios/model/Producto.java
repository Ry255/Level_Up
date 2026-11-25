package com.example.Evalucacion3.ApiUsuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PRODUCTO")
@Getter
@Setter
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String codigo;

    @Column(nullable = false, length = 120)
    private String nombre;

    @Column(length = 500)
    private String descripcion;

    /** Pesos chilenos (CLP), sin decimales. */
    @Column(nullable = false)
    private int precio;

    @Column(nullable = false)
    private int stock;

    @Column(length = 255)
    private String imagen;

    /** Baja logica. */
    @Column(nullable = false)
    private boolean activo = true;

    @ManyToOne(optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
}
