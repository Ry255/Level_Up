package com.example.Evalucacion3.ApiUsuarios.service;

import com.example.Evalucacion3.ApiUsuarios.exception.NotFoundException;
import com.example.Evalucacion3.ApiUsuarios.model.Producto;
import com.example.Evalucacion3.ApiUsuarios.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Acceso a datos de PRODUCTO. Las reglas de negocio (RN09: codigo unico, precio y stock validos)
 * las agrega el integrante 2 sobre estos metodos base.
 */
@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /** Solo productos activos (los que ve la tienda). */
    @Transactional(readOnly = true)
    public List<Producto> listarActivos() {
        return productoRepository.findByActivoTrue();
    }

    /** Solo productos activos; uno dado de baja se trata como inexistente (404). */
    @Transactional(readOnly = true)
    public Producto obtenerActivo(Long id) {
        return productoRepository.findByIdAndActivoTrue(id)
                .orElseThrow(() -> new NotFoundException("No existe el producto con id " + id));
    }

    @Transactional(readOnly = true)
    public Producto obtener(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("No existe el producto con id " + id));
    }

    @Transactional
    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    /** Baja logica (RN12). */
    @Transactional
    public void darDeBaja(Long id) {
        Producto producto = obtener(id);
        producto.setActivo(false);
        productoRepository.save(producto);
    }
}
