import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("login_success");
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("login_success", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("login_success");
    }
  }, [usuario]);

  const registrar = ({ name, email, password }) => {
    if (name.length < 4) {
      return { ok: false, mensaje: "El nombre debe tener al menos 4 caracteres" };
    }

    const emailValido =
      email.endsWith("@gmail.com") ||
      email.endsWith("@duocuc.cl") ||
      email.endsWith("@profesor.duocuc.cl");

    if (!emailValido) {
      return {
        ok: false,
        mensaje: "El correo debe ser @gmail.com, @duocuc.cl o @profesor.duocuc.cl",
      };
    }

    if (password.length < 4) {
      return {
        ok: false,
        mensaje: "La contraseña debe tener al menos 4 caracteres",
      };
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      return { ok: false, mensaje: "El usuario ya está registrado!" };
    }

    const esDuoc =
      email.includes("@duocuc.cl") || email.includes("@profesor.duocuc.cl");

    users.push({ name, email, password, esDuoc });
    localStorage.setItem("users", JSON.stringify(users));

    return { ok: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!validUser) {
      return { ok: false, mensaje: "Usuario y/o contraseña incorrectos!" };
    }

    setUsuario(validUser);

    let mensajeBienvenida = `Bienvenido ${validUser.name}`;
    if (validUser.esDuoc) {
      mensajeBienvenida = `¡Bienvenido ${validUser.name}! Recuerda que tienes 20% de descuento en tus compras`;
    }

    return { ok: true, mensaje: mensajeBienvenida };
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("login_success");
  };

  return (
    <AuthContext.Provider value={{ usuario, registrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);