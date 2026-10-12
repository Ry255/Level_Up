import { createContext, useContext, useEffect, useState } from "react";

const LLAVE = "carrito_shop";

const CarritoContext = createContext([]);

function leerCarrito() {
    try {
        const storageActual = localStorage.getItem(LLAVE);
        return storageActual ? JSON.parse(storageActual) : [];
    } catch {
        return [];
    }
}

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarrito);

    useEffect(() => {
        localStorage.setItem(LLAVE, JSON.stringify(carrito));
    }, [carrito]);

    // Equivale a guardarProducto() de main.js
    function agregarProducto(producto) {
        setCarrito((lista) => {
            const existente = lista.find((p) => p.codigo === producto.codigo);
            if (existente) {
                return lista.map((p) =>
                    p.codigo === producto.codigo ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            return [...lista, { ...producto, cantidad: 1 }];
        });
    }

    // Equivale a cambiarCantidad() de Carrito.js
    function cambiarCantidad(codigo, delta) {
        setCarrito((lista) =>
            lista
                .map((p) =>
                    p.codigo === codigo ? { ...p, cantidad: p.cantidad + delta } : p
                )
                .filter((p) => p.cantidad > 0)
        );
    }

    // Equivale a eliminarProducto() de Carrito.js
    function eliminarProducto(codigo) {
        setCarrito((lista) => lista.filter((p) => p.codigo !== codigo));
    }

    return (
        <CarritoContext.Provider
            value={{ carrito, agregarProducto, cambiarCantidad, eliminarProducto }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}
