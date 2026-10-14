import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../../context/AuthContext";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderLogin() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renderiza sin errores", () => {
    renderLogin();
    expect(
      screen.getByRole("heading", { level: 2, name: "Login" })
    ).toBeInTheDocument();
  });

  it("muestra error si los campos están vacíos", () => {
    renderLogin();
    fireEvent.submit(screen.getByDisplayValue("Ingresar"));
    expect(window.alert).toHaveBeenCalledWith("Completa todos los campos");
  });

  it("muestra error si el usuario no existe", () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "noexiste@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Ingresar"));
    expect(window.alert).toHaveBeenCalledWith(
      "Usuario y/o contraseña incorrectos!"
    );
  });

  it("loguea correctamente con credenciales válidas", () => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { name: "Tester", email: "test@gmail.com", password: "1234", esDuoc: false },
      ])
    );
    renderLogin();
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Ingresar"));
    expect(window.alert).toHaveBeenCalledWith("Bienvenido Tester");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("muestra mensaje de descuento si el usuario es de Duoc", () => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { name: "Alumno", email: "alumno@duocuc.cl", password: "1234", esDuoc: true },
      ])
    );
    renderLogin();
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "alumno@duocuc.cl" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Ingresar"));
    expect(window.alert).toHaveBeenCalledWith(
      "¡Bienvenido Alumno! Recuerda que tienes 20% de descuento en tus compras"
    );
  });
});