import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Catalogo from './catalogo';
import { CarritoProvider } from '../../context/carritoContext';

function renderCatalogo() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Catalogo />
      </CarritoProvider>
    </MemoryRouter>
  );
}

describe('Catalogo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza sin errores', () => {
    renderCatalogo();
    expect(document.body).toBeInTheDocument();
  });

  it('muestra los productos del catÃ¡logo', () => {
    renderCatalogo();
    expect(screen.getByText('catan')).toBeInTheDocument();
    expect(screen.getByText('carcassonne')).toBeInTheDocument();
    expect(screen.getByText('PlaStation 5')).toBeInTheDocument();
  });

  it('muestra el precio de un producto', () => {
    renderCatalogo();
    expect(screen.getAllByText('$29.990')).toHaveLength(2);
    expect(screen.getByText('$549.990')).toBeInTheDocument();
  });

  it('agrega un producto al carrito', () => {
    renderCatalogo();
    const boton = screen.getAllByText('Agregar al carrito')[0];
    fireEvent.click(boton);

    const carrito = JSON.parse(localStorage.getItem('carrito_shop'));
    expect(carrito).toHaveLength(1);
    expect(carrito[0].codigo).toBe('JM001');
    expect(carrito[0].cantidad).toBe(1);
  });

  it('incrementa la cantidad si el producto ya estÃ¡ en el carrito', () => {
    renderCatalogo();
    const boton = screen.getAllByText('Agregar al carrito')[0];
    fireEvent.click(boton);
    fireEvent.click(boton);

    const carrito = JSON.parse(localStorage.getItem('carrito_shop'));
    expect(carrito[0].cantidad).toBe(2);
  });
});
