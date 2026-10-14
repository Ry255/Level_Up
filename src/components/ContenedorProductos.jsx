import ProductoCard from "./ProductoCard";

export default function ContenedorProductos({ productos }) {
  if (productos.length === 0) {
    return <p className="text-center mt-3">No hay productos en esta categoría.</p>;
  }

  return (
    <div className="contenedor-card">
      {productos.map((p) => (
        <ProductoCard key={p.codigo} producto={p} />
      ))}
    </div>
  );
}