import { createBrowserRouter } from "react-router-dom";
import Catalogo from "./pages/catalogo/catalogo";
import Carrito from "./pages/carrito/carrito";

export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Catalogo/>
    },
    {
        path:"/carrito",
        element:<Carrito/>
    }
]);
