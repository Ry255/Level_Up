import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-info">
        <div className="container">
          <Link className="navbar-brand text-success" to="/">LEVEL-UP GAMER</Link>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/registro">Registro</Link></li>
            </ul>
            <span className="navbar-text ms-3 text-success">🛒 (0)</span>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="text-center py-3 bg-dark border-top border-info">
        <p className="text-secondary">© 2026 Level-Up Gamer</p>
      </footer>
    </>
  );
};

export default Layout;