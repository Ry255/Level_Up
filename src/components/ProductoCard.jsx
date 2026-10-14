import { useCarrito } from "../context/CarritoContext";

export default function ProductoCard({ producto }) {
  const { agregarProducto } = useCarrito();

  const precioFormateado = producto.precio.toLocaleString("es-CL");

  return (
    <div className="card">
      <h1>{producto.nombre}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="imgProducto"
      />
      <h3>${precioFormateado}</h3>
      <button
        className="btn btn-primary mt-3"
        onClick={() => agregarProducto(producto)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}