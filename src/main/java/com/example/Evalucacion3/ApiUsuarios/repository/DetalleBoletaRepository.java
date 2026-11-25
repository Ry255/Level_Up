package com.example.Evalucacion3.ApiUsuarios.repository;

import com.example.Evalucacion3.ApiUsuarios.model.DetalleBoleta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Long> {

    List<DetalleBoleta> findByBoletaId(Long boletaId);
}
