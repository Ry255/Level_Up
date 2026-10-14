import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Completa todos los campos");
    }

    const resultado = login(email.trim(), password.trim());

    if (!resultado.ok) {
      return alert(resultado.mensaje);
    }

    alert(resultado.mensaje);
    navigate("/");
  };

  return (
    <section>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Mail</label>
        <input
          id="email"
          type="email"
          placeholder="..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input type="submit" value="Ingresar" />
      </form>

      <p>
        No tienes una cuenta? <Link to="/registro">Registro</Link>
      </p>
    </section>
  );
}