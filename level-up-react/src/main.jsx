import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { CarritoProvider } from './context/carritoContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <RouterProvider router = {routes}/>
    </CarritoProvider>
  </StrictMode>,
)
