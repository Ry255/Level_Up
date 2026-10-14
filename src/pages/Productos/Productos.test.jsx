import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Productos from "./Productos";
import { CarritoProvider } from "../../context/CarritoContext";

function renderProductos() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Productos />
      </CarritoProvider>
    </MemoryRouter>
  );
}

describe("Productos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza sin errores", () => {
    renderProductos();
    expect(document.body).toBeInTheDocument();
  });

  it("muestra los productos del catálogo", () => {
    renderProductos();
    expect(screen.getByText("Catan")).toBeInTheDocument();
    expect(screen.getByText("Carcassonne")).toBeInTheDocument();
    expect(screen.getByText("PlayStation 5")).toBeInTheDocument();
  });

  it("muestra el precio de un producto", () => {
    renderProductos();
    expect(screen.getAllByText("$29.990")).toHaveLength(2);
    expect(screen.getByText("$549.990")).toBeInTheDocument();
  });

  it("agrega un producto al carrito", () => {
    renderProductos();
    const boton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(boton);

    const carrito = JSON.parse(localStorage.getItem("carrito_shop"));
    expect(carrito).toHaveLength(1);
    expect(carrito[0].codigo).toBe("JM001");
    expect(carrito[0].cantidad).toBe(1);
  });

  it("incrementa la cantidad si el producto ya está en el carrito", () => {
    renderProductos();
    const boton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(boton);
    fireEvent.click(boton);

    const carrito = JSON.parse(localStorage.getItem("carrito_shop"));
    expect(carrito[0].cantidad).toBe(2);
  });
});