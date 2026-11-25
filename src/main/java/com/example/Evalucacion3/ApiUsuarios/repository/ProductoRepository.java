package com.example.Evalucacion3.ApiUsuarios.repository;

import com.example.Evalucacion3.ApiUsuarios.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByActivoTrue();

    Optional<Producto> findByIdAndActivoTrue(Long id);

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);

    boolean existsByCategoriaId(Long categoriaId);
}
