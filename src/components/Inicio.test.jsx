import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Inicio from './Inicio'

const renderInicio = () =>
  render(
    <MemoryRouter>
      <Inicio />
    </MemoryRouter>
  )

describe('Inicio', () => {
  it('muestra el título LEVEL-UP GAMER', () => {
    renderInicio()
    expect(
      screen.getByRole('heading', { level: 1, name: 'LEVEL-UP GAMER' })
    ).toBeInTheDocument()
  })

  it('renderiza exactamente 4 productos destacados', () => {
    renderInicio()
    // Cada producto tiene una imagen con alt = nombre del producto
    expect(screen.getAllByRole('img')).toHaveLength(4)
    expect(screen.getAllByRole('link', { name: 'Ver detalle' })).toHaveLength(4)
  })

  it('muestra los nombres de los productos', () => {
    renderInicio()
    expect(screen.getByText('Catan')).toBeInTheDocument()
    expect(screen.getByText('PlayStation 5')).toBeInTheDocument()
  })
})