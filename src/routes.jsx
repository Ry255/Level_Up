import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio/Inicio";
import Productos from "./pages/Productos/Productos";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Contacto from "./pages/Contacto/Contacto";
import Carrito from "./pages/Carrito/Carrito";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: "productos", element: <Productos /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      { path: "contacto", element: <Contacto /> },
      { path: "carrito", element: <Carrito /> },
    ],
  },
]);