package com.example.Evalucacion3.ApiUsuarios.service;

import com.example.Evalucacion3.ApiUsuarios.exception.NotFoundException;
import com.example.Evalucacion3.ApiUsuarios.model.Categoria;
import com.example.Evalucacion3.ApiUsuarios.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Acceso a datos de CATEGORIA. Las reglas de negocio (RN10: no borrar categorias con productos, nombre unico)
 * las agrega el integrante 2 sobre estos metodos base.
 */
@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Categoria obtener(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("No existe la categoría con id " + id));
    }

    @Transactional
    public Categoria guardar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public void eliminar(Long id) {
        categoriaRepository.delete(obtener(id));
    }
}
