import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Inicio from "./Inicio";
import { CarritoProvider } from "../../context/CarritoContext";

const renderInicio = () =>
  render(
    <MemoryRouter>
      <CarritoProvider>
        <Inicio />
      </CarritoProvider>
    </MemoryRouter>
  );

describe("Inicio", () => {
  it("muestra el título LEVEL-UP GAMER", () => {
    renderInicio();
    expect(
      screen.getByRole("heading", { level: 1, name: "LEVEL-UP GAMER" })
    ).toBeInTheDocument();
  });

  it("renderiza exactamente 4 productos destacados", () => {
    renderInicio();
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  it("muestra los nombres de los productos destacados", () => {
    renderInicio();
    expect(screen.getByText("Catan")).toBeInTheDocument();
    expect(screen.getByText("Carcassonne")).toBeInTheDocument();
  });

  it("muestra el botón Ver Catálogo", () => {
    renderInicio();
    expect(
      screen.getByRole("link", { name: "Ver Catálogo" })
    ).toBeInTheDocument();
  });
});