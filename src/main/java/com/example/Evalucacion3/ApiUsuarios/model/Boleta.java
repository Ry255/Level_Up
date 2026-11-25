package com.example.Evalucacion3.ApiUsuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BOLETA")
@Getter
@Setter
@NoArgsConstructor
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private int subtotal;

    @Column(nullable = false)
    private int descuento = 0;

    @Column(nullable = false)
    private int total;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private EstadoBoleta estado = EstadoBoleta.EMITIDA;

    @OneToMany(mappedBy = "boleta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleBoleta> detalles = new ArrayList<>();

    @PrePersist
    void antesDeGuardar() {
        if (fecha == null) {
            fecha = LocalDateTime.now();
        }
    }

    public void agregarDetalle(DetalleBoleta detalle) {
        detalles.add(detalle);
        detalle.setBoleta(this);
    }
}
