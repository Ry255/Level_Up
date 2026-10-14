import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Contacto from "./Contacto";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderContacto() {
  return render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
  );
}

describe("Contacto", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renderiza sin errores", () => {
    renderContacto();
    expect(
      screen.getByRole("heading", { level: 2, name: "Contacto" })
    ).toBeInTheDocument();
  });

  it("muestra error si el nombre está vacío", () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: { value: "Hola" },
    });
    fireEvent.submit(screen.getByDisplayValue("Enviar"));
    expect(window.alert).toHaveBeenCalledWith("El nombre es obligatorio");
  });

  it("muestra error si el email no contiene @", () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "correo" },
    });
    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: { value: "Hola" },
    });
    fireEvent.submit(screen.getByDisplayValue("Enviar"));
    expect(window.alert).toHaveBeenCalledWith("Ingresa un correo válido");
  });

  it("muestra error si el mensaje está vacío", () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.submit(screen.getByDisplayValue("Enviar"));
    expect(window.alert).toHaveBeenCalledWith("El mensaje es obligatorio");
  });

  it("guarda el mensaje correctamente", () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText("Mail"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: { value: "Hola, quiero información" },
    });
    fireEvent.submit(screen.getByDisplayValue("Enviar"));

    const mensajes = JSON.parse(localStorage.getItem("contactMessages"));
    expect(mensajes).toHaveLength(1);
    expect(mensajes[0].name).toBe("Tester");
    expect(mensajes[0].email).toBe("test@gmail.com");
    expect(mensajes[0].message).toBe("Hola, quiero información");
    expect(window.alert).toHaveBeenCalledWith("Mensaje enviado correctamente");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});