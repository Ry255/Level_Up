package com.example.Evalucacion3.ApiUsuarios.service;

import com.example.Evalucacion3.ApiUsuarios.exception.NotFoundException;
import com.example.Evalucacion3.ApiUsuarios.model.Boleta;
import com.example.Evalucacion3.ApiUsuarios.model.DetalleBoleta;
import com.example.Evalucacion3.ApiUsuarios.repository.BoletaRepository;
import com.example.Evalucacion3.ApiUsuarios.repository.DetalleBoletaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Acceso a datos de BOLETA y DETALLE_BOLETA. La logica de compra (RN01 a RN08: validar stock, calcular
 * subtotal/descuento/total, transaccion, anular) la agrega el integrante 2 sobre estos metodos base.
 */
@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;
    private final DetalleBoletaRepository detalleBoletaRepository;

    public BoletaService(BoletaRepository boletaRepository, DetalleBoletaRepository detalleBoletaRepository) {
        this.boletaRepository = boletaRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
    }

    @Transactional(readOnly = true)
    public List<Boleta> listar() {
        return boletaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Boleta obtener(Long id) {
        return boletaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("No existe la boleta con id " + id));
    }

    @Transactional(readOnly = true)
    public List<DetalleBoleta> listarDetalles(Long boletaId) {
        obtener(boletaId);
        return detalleBoletaRepository.findByBoletaId(boletaId);
    }

    @Transactional
    public Boleta guardar(Boleta boleta) {
        return boletaRepository.save(boleta);
    }
}
