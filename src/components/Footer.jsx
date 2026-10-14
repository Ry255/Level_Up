import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center py-3 bg-dark border-top border-info mt-5">
      <Link className="nav-link" to="/contacto">
        Contáctanos
      </Link>
      <p className="text-secondary mt-2">
        © 2026 Level UP. Todos los derechos reservados.
      </p>
    </footer>
  );
}