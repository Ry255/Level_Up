import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultado = registrar({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    });

    if (!resultado.ok) {
      return alert(resultado.mensaje);
    }

    alert("Registro Exitoso!");
    navigate("/login");
  };

  return (
    <section>
      <h2>Registro</h2>
      <form id="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="email">Mail</label>
        <input
          id="email"
          type="email"
          placeholder="..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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

        <input type="submit" value="Registro" />
      </form>

      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  );
}