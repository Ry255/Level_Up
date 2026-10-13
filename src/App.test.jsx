import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from './App'

const MostrarUrl = () => {
  const location = useLocation()
  return <div data-testid="url">{location.pathname}</div>
}

const renderApp = (ruta = '/') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
      <MostrarUrl />
    </MemoryRouter>
  )

describe('Navegación del navbar', () => {
  it('Productos cambia la URL y muestra su página', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: 'Productos' }))

    expect(screen.getByTestId('url')).toHaveTextContent('/productos')
    expect(screen.getByText('Página de Productos')).toBeInTheDocument()
  })

  it('Contacto cambia la URL y muestra su página', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: 'Contacto' }))

    expect(screen.getByTestId('url')).toHaveTextContent('/contacto')
    expect(screen.getByText('Página de Contacto')).toBeInTheDocument()
  })

  it('Registro cambia la URL y muestra su página', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: 'Registro' }))

    expect(screen.getByTestId('url')).toHaveTextContent('/registro')
    expect(screen.getByText('Página de Registro')).toBeInTheDocument()
  })

  it('el navbar sigue visible en otras páginas (previene el bug de página en blanco)', () => {
    renderApp('/productos')
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument()
  })
})