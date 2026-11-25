package com.example.Evalucacion3.ApiUsuarios.repository;

import com.example.Evalucacion3.ApiUsuarios.model.Boleta;
import com.example.Evalucacion3.ApiUsuarios.model.EstadoBoleta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoletaRepository extends JpaRepository<Boleta, Long> {

    List<Boleta> findByUsuarioId(Long usuarioId);

    List<Boleta> findByEstado(EstadoBoleta estado);
}
