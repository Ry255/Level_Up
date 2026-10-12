import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import App_navbar from '../../components/navbar/navbar';
import { productos } from '../../data/productos';
import { useCarrito } from '../../context/carritoContext';
import './catalogo.module.css';
import estilos from './catalogo.module.css';


function Catalogo() {
    const { agregarProducto } = useCarrito();
    const [categoria, setCategoria] = useState("todos");
    const location = useLocation();

    useEffect(() => {
        if (location.state?.categoria) {
            setCategoria(location.state.categoria);
        }
    }, [location.state]);

    const lista = categoria === "todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    return (
        <>
            <App_navbar />
            <section className={`${estilos.seccion} py-4`}>
                <div className="d-flex justify-content-between align-items-center px-4 mb-3">
                    <h2 className="fs-4">
                        {categoria === "todos" ? "Todos los productos" : `CategorÃ­a: ${categoria}`}
                    </h2>
                    {categoria !== "todos" && (
                        <Button variant="outline-success" onClick={() => setCategoria("todos")}>
                            Ver todos
                        </Button>
                    )}
                </div>

                <div className={estilos.contenedorCard}>
                    {lista.length === 0 ? (
                        <p className="text-center w-100">No hay productos en esta categorÃ­a.</p>
                    ) : (
                        lista.map((producto) => (
                            <Card key={producto.codigo} className={estilos.card}>
                                <Card.Img
                                    variant="top"
                                    src={`/${producto.imagen}`}
                                    alt={producto.nombre}
                                    className={estilos.imgProducto}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title>{producto.nombre}</Card.Title>
                                    <Card.Text>${producto.precio}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => agregarProducto(producto)}
                                    >
                                        Agregar al carrito
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}

export default Catalogo;
