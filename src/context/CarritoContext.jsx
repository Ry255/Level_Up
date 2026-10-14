import { createContext, useContext, useEffect, useState } from "react";

const LLAVE = "carrito_shop";
const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem(LLAVE);
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem(LLAVE, JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.codigo === producto.codigo);
      if (existente) {
        return prev.map((p) =>
          p.codigo === producto.codigo ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarProducto = (codigo) => {
    setCarrito((prev) => prev.filter((p) => p.codigo !== codigo));
  };

  const cambiarCantidad = (codigo, delta) => {
    setCarrito((prev) => {
      const actualizado = prev.map((p) =>
        p.codigo === codigo ? { ...p, cantidad: p.cantidad + delta } : p
      );
      return actualizado.filter((p) => p.cantidad > 0);
    });
  };

  const limpiarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const totalPrecio = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        quitarProducto,
        cambiarCantidad,
        limpiarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);