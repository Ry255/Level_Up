package com.example.Evalucacion3.ApiUsuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "DETALLE_BOLETA")
@Getter
@Setter
@NoArgsConstructor
public class DetalleBoleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "boleta_id", nullable = false)
    private Boleta boleta;

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(nullable = false)
    private int cantidad;

    /** Copia del precio del producto al momento de la compra. */
    @Column(name = "precio_unitario", nullable = false)
    private int precioUnitario;

    @Column(nullable = false)
    private int subtotal;
}
