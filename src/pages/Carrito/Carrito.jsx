import { useCarrito } from "../../context/CarritoContext";

export default function Carrito() {
  const { carrito, cambiarCantidad, quitarProducto, totalPrecio } = useCarrito();

  const formatearPrecio = (numero) => numero.toLocaleString("es-CL");

  return (
    <div className="container mt-4">
      <h2>Resumen del carrito</h2>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                El carrito está vacío
              </td>
            </tr>
          ) : (
            carrito.map((producto) => {
              const subtotal = producto.precio * producto.cantidad;
              return (
                <tr key={producto.codigo}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${formatearPrecio(producto.precio)}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={() => cambiarCantidad(producto.codigo, -1)}
                      >
                        -
                      </button>
                      <span>{producto.cantidad}</span>
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={() => cambiarCantidad(producto.codigo, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${formatearPrecio(subtotal)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => quitarProducto(producto.codigo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <h4 className="text-end">Total: ${formatearPrecio(totalPrecio)}</h4>
    </div>
  );
}