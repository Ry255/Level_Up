import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";

export default function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <RouterProvider router={router} />
      </CarritoProvider>
    </AuthProvider>
  );
}