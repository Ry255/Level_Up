import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Inicio from './Inicio'

// Reemplazamos data.js por una versión falsa con 6 productos
vi.mock('../data', () => ({
  productos: Array.from({ length: 6 }, (_, i) => ({
    codigo: `T00${i}`,
    nombre: `Producto ${i}`,
    precio: 1000,
    categoria: 'Prueba',
    descripcion: 'Descripción de prueba',
    img: `https://ejemplo.com/${i}.png`,
  })),
}))

describe('Inicio con datos simulados (mock)', () => {
  it('Test 12: muestra solo 4 productos aunque existan 6', () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    )
    expect(screen.getAllByRole('img')).toHaveLength(4)
    expect(screen.queryByText('Producto 5')).not.toBeInTheDocument()
  })
})