import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Carrito from "./Carrito";
import { CarritoProvider } from "../../context/CarritoContext";

function renderCarrito() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>
  );
}

describe("Carrito", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza sin errores", () => {
    renderCarrito();
    expect(document.body).toBeInTheDocument();
  });

  it("muestra el mensaje cuando el carrito está vacío", () => {
    renderCarrito();
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });

  it("muestra un producto con su subtotal", () => {
    localStorage.setItem(
      "carrito_shop",
      JSON.stringify([
        {
          codigo: "JM001",
          nombre: "Catan",
          categoria: "Juego de Mesa",
          precio: 29990,
          imagen: "/img/catan.jpeg",
          cantidad: 2,
        },
      ])
    );
    renderCarrito();

    expect(screen.getByText("Catan")).toBeInTheDocument();
    expect(screen.getByText("Juego de Mesa")).toBeInTheDocument();
    expect(screen.getByText("$29.990")).toBeInTheDocument();
    expect(screen.getByText("$59.980")).toBeInTheDocument();
    expect(screen.getByText("Total: $59.980")).toBeInTheDocument();
  });

  it("incrementa la cantidad con el botón +", () => {
    localStorage.setItem(
      "carrito_shop",
      JSON.stringify([
        {
          codigo: "JM001",
          nombre: "Catan",
          categoria: "Juego de Mesa",
          precio: 29990,
          imagen: "/img/catan.jpeg",
          cantidad: 1,
        },
      ])
    );
    renderCarrito();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("$59.980")).toBeInTheDocument();
    expect(screen.getByText("Total: $59.980")).toBeInTheDocument();
  });

  it("elimina el producto cuando la cantidad llega a 0", () => {
    localStorage.setItem(
      "carrito_shop",
      JSON.stringify([
        {
          codigo: "JM001",
          nombre: "Catan",
          categoria: "Juego de Mesa",
          precio: 29990,
          imagen: "/img/catan.jpeg",
          cantidad: 1,
        },
      ])
    );
    renderCarrito();

    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });

  it("elimina un producto con el botón Eliminar", () => {
    localStorage.setItem(
      "carrito_shop",
      JSON.stringify([
        {
          codigo: "JM001",
          nombre: "Catan",
          categoria: "Juego de Mesa",
          precio: 29990,
          imagen: "/img/catan.jpeg",
          cantidad: 1,
        },
      ])
    );
    renderCarrito();

    fireEvent.click(screen.getByText("Eliminar"));
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
  });
});