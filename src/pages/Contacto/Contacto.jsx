import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = name.trim();
    const correo = email.trim();
    const mensaje = message.trim();

    if (nombre.length === 0) return alert("El nombre es obligatorio");
    if (nombre.length > 100)
      return alert("El nombre no puede superar los 100 caracteres");

    if (correo.length === 0) return alert("El correo es obligatorio");
    if (!correo.includes("@")) return alert("Ingresa un correo válido");
    if (correo.length > 100)
      return alert("El correo no puede superar los 100 caracteres");

    if (mensaje.length === 0) return alert("El mensaje es obligatorio");
    if (mensaje.length > 500)
      return alert("El mensaje no puede superar los 500 caracteres");

    const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push({ name: nombre, email: correo, message: mensaje });
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    alert("Mensaje enviado correctamente");
    navigate("/");
  };

  return (
    <section>
      <h2>Contacto</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
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

        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          placeholder="..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <input type="submit" value="Enviar" />
      </form>
    </section>
  );
}