import { Link } from "react-router-dom";
import { productos } from "../../data/productos";
import ProductoCard from "../../components/ProductoCard";

export default function Inicio() {
  const destacados = productos.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <div className="container text-center py-5">
        <h1 className="text-success">LEVEL-UP GAMER</h1>
        <p className="text-secondary">
          Los mejores productos para gamers en Chile.
        </p>
        <Link to="/productos" className="btn btn-success">
          Ver Catálogo
        </Link>
      </div>

      {/* Productos destacados */}
      <div className="container">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="contenedor-card">
          {destacados.map((p) => (
            <ProductoCard key={p.codigo} producto={p} />
          ))}
        </div>
      </div>
    </>
  );
}