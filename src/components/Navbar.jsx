import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

const categorias = [
  "Juego de Mesa",
  "Accesorios",
  "Consolas",
  "Computadores Gamers",
  "Silla Gamers",
  "Mouse",
  "Mousepad",
  "Poleras Personalizadas",
  "Polerones Gamers Personalizados",
  "Servicio Tecnico",
];

export default function Navbar() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useCarrito();
  const { usuario, logout } = useAuth();

  const handleBuscar = (e) => {
    e.preventDefault();
    const termino = busqueda.trim();
    if (termino === "") {
      navigate("/productos");
    } else {
      navigate(`/productos?buscar=${encodeURIComponent(termino)}`);
    }
    setBusqueda("");
  };

  const handleCategoria = (categoria) => {
    navigate(`/productos?categoria=${encodeURIComponent(categoria)}`);
  };

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada");
    navigate("/");
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-success" to="/">
            Level UP
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/productos">
                  Productos
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categoría
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/productos")}
                    >
                      Todas
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {categorias.map((cat) => (
                    <li key={cat}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategoria(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/carrito">
                  Carrito 🛒 ({totalItems})
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search" onSubmit={handleBuscar}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>

            <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
              {usuario ? (
                <>
                  <li className="nav-item">
                    <span className="navbar-text text-success me-2">
                      Hola, {usuario.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registro">
                      Registro
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}