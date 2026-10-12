import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Carrito from './carrito';
import { CarritoProvider } from '../../context/carritoContext';

function renderCarrito() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>
  );
}

describe('Carrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza sin errores', () => {
    renderCarrito();
    expect(document.body).toBeInTheDocument();
  });

  it('muestra el mensaje cuando el carrito estÃ¡ vacÃ­o', () => {
    renderCarrito();
    expect(screen.getByText('El carrito estÃ¡ vacÃ­o')).toBeInTheDocument();
    expect(screen.getByText('Total: $0')).toBeInTheDocument();
  });

  it('muestra un producto con su subtotal', () => {
    localStorage.setItem(
      'carrito_shop',
      JSON.stringify([
        {
          codigo: 'JM001',
          nombre: 'catan',
          categoria: 'Juego de Mesa',
          precio: '29.990',
          imagen: 'img/catan.jpeg',
          cantidad: 2
        }
      ])
    );
    renderCarrito();

    expect(screen.getByText('catan')).toBeInTheDocument();
    expect(screen.getByText('Juego de Mesa')).toBeInTheDocument();
    expect(screen.getByText('$29.990')).toBeInTheDocument();
   
    expect(screen.getByText('$59.980')).toBeInTheDocument();
    expect(screen.getByText('Total: $59.980')).toBeInTheDocument();
  });

  it('incrementa la cantidad con el botÃ³n +', () => {
    localStorage.setItem(
      'carrito_shop',
      JSON.stringify([
        {
          codigo: 'JM001',
          nombre: 'catan',
          categoria: 'Juego de Mesa',
          precio: '29.990',
          imagen: 'img/catan.jpeg',
          cantidad: 1
        }
      ])
    );
    renderCarrito();

    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('$59.980')).toBeInTheDocument();
    expect(screen.getByText('Total: $59.980')).toBeInTheDocument();
  });

  it('elimina el producto cuando la cantidad llega a 0', () => {
    localStorage.setItem(
      'carrito_shop',
      JSON.stringify([
        {
          codigo: 'JM001',
          nombre: 'catan',
          categoria: 'Juego de Mesa',
          precio: '29.990',
          imagen: 'img/catan.jpeg',
          cantidad: 1
        }
      ])
    );
    renderCarrito();

    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('El carrito estÃ¡ vacÃ­o')).toBeInTheDocument();
    expect(screen.getByText('Total: $0')).toBeInTheDocument();
  });

  it('elimina un producto con el botÃ³n Eliminar', () => {
    localStorage.setItem(
      'carrito_shop',
      JSON.stringify([
        {
          codigo: 'JM001',
          nombre: 'catan',
          categoria: 'Juego de Mesa',
          precio: '29.990',
          imagen: 'img/catan.jpeg',
          cantidad: 1
        }
      ])
    );
    renderCarrito();

    fireEvent.click(screen.getByText('Eliminar'));
    expect(screen.getByText('El carrito estÃ¡ vacÃ­o')).toBeInTheDocument();
  });
});
