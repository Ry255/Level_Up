import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro";
import { AuthProvider } from "../../context/AuthContext";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderRegistro() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Registro />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Registro", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renderiza sin errores", () => {
    renderRegistro();
    expect(
      screen.getByRole("heading", { level: 2, name: "Registro" })
    ).toBeInTheDocument();
  });

  it("muestra error si el nombre es muy corto", () => {
    renderRegistro();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Registro"));
    expect(window.alert).toHaveBeenCalledWith(
      "El nombre debe tener al menos 4 caracteres"
    );
  });

  it("muestra error si el email no es válido", () => {
    renderRegistro();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@hotmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Registro"));
    expect(window.alert).toHaveBeenCalledWith(
      "El correo debe ser @gmail.com, @duocuc.cl o @profesor.duocuc.cl"
    );
  });

  it("muestra error si la contraseña es muy corta", () => {
    renderRegistro();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "12" },
    });
    fireEvent.submit(screen.getByDisplayValue("Registro"));
    expect(window.alert).toHaveBeenCalledWith(
      "La contraseña debe tener al menos 4 caracteres"
    );
  });

  it("muestra error si el usuario ya está registrado", () => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { name: "Existente", email: "test@gmail.com", password: "1234" },
      ])
    );
    renderRegistro();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Registro"));
    expect(window.alert).toHaveBeenCalledWith("El usuario ya está registrado!");
  });

  it("registra correctamente un usuario nuevo", () => {
    renderRegistro();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByDisplayValue("Registro"));

    const users = JSON.parse(localStorage.getItem("users"));
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("test@gmail.com");
    expect(users[0].name).toBe("Tester");
    expect(window.alert).toHaveBeenCalledWith("Registro Exitoso!");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});