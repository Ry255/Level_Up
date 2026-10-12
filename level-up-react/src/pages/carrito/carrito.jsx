import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import App_navbar from '../../components/navbar/navbar';
import { useCarrito } from '../../context/carritoContext';
import './carrito.module.css';
import estilos from './carrito.module.css';

// Convierte "1.299.990" (formato chileno) a 1299990
function precioANumero(precioTexto) {
    return parseInt(precioTexto.replace(/\./g, ""), 10);
}

function formatearPrecio(numero) {
    return numero.toLocaleString("es-CL");
}

function Carrito() {
    const { carrito, cambiarCantidad, eliminarProducto } = useCarrito();

    const total = carrito.reduce(
        (acc, p) => acc + precioANumero(p.precio) * p.cantidad,
        0
    );

    return (
        <>
            <App_navbar />
            <div className={`${estilos.contenedor} container mt-4`}>
                <h2>Resumen del carrito</h2>
                <Table striped bordered hover variant="dark">
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
                                const precioUnitario = precioANumero(producto.precio);
                                const subtotal = precioUnitario * producto.cantidad;
                                return (
                                    <tr key={producto.codigo}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.categoria}</td>
                                        <td>${formatearPrecio(precioUnitario)}</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <Button
                                                    variant="outline-light"
                                                    size="sm"
                                                    onClick={() => cambiarCantidad(producto.codigo, -1)}
                                                >
                                                    -
                                                </Button>
                                                <span>{producto.cantidad}</span>
                                                <Button
                                                    variant="outline-light"
                                                    size="sm"
                                                    onClick={() => cambiarCantidad(producto.codigo, 1)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </td>
                                        <td>${formatearPrecio(subtotal)}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => eliminarProducto(producto.codigo)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-end">Total: ${formatearPrecio(total)}</h4>
                    <Link to="/" className="btn btn-outline-success">
                        Seguir comprando
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Carrito;
