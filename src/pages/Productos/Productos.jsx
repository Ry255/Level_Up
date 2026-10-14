import { useSearchParams } from "react-router-dom";
import { productos } from "../../data/productos";
import ContenedorProductos from "../../components/ContenedorProductos";

export default function Productos() {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get("categoria") || "todos";
  const busqueda = searchParams.get("buscar") || "";

  let lista = productos;

  if (categoria !== "todos") {
    lista = lista.filter((p) => p.categoria === categoria);
  }

  if (busqueda.trim() !== "") {
    const termino = busqueda.toLowerCase();
    lista = lista.filter((p) => p.nombre.toLowerCase().includes(termino));
  }

  return (
    <section id="prueba">
      {busqueda && (
        <h3 className="text-center mt-3">
          Resultados para: <span className="text-success">"{busqueda}"</span>
        </h3>
      )}
      <ContenedorProductos productos={lista} />
    </section>
  );
}