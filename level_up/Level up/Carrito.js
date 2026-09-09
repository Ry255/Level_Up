const LLAVE = "carrito_shop";

const cuerpoCarrito = document.getElementById("cuerpoCarrito");
const totalCarritoEl = document.getElementById("totalCarrito");

function obtenerCarrito() {
    const storageActual = localStorage.getItem(LLAVE);
    return storageActual ? JSON.parse(storageActual) : [];
}

function guardarCarrito(lista) {
    localStorage.setItem(LLAVE, JSON.stringify(lista));
}

// Convierte "1.299.990" (formato chileno) a 1299990
function precioANumero(precioTexto) {
    return parseInt(precioTexto.replace(/\./g, ""), 10);
}

function formatearPrecio(numero) {
    return numero.toLocaleString("es-CL");
}

function cambiarCantidad(codigo, delta) {
    const lista = obtenerCarrito();
    const producto = lista.find(p => p.codigo === codigo);
    if (!producto) return;

    producto.cantidad += delta;

    if (producto.cantidad <= 0) {
        eliminarProducto(codigo);
        return;
    }

    guardarCarrito(lista);
    renderizarCarrito();
}

function eliminarProducto(codigo) {
    const lista = obtenerCarrito().filter(p => p.codigo !== codigo);
    guardarCarrito(lista);
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = obtenerCarrito();

    cuerpoCarrito.innerHTML = "";
    let total = 0;

    if (lista.length === 0) {
        cuerpoCarrito.innerHTML = `<tr><td colspan="6" class="text-center">El carrito está vacío</td></tr>`;
        totalCarritoEl.textContent = "0";
        return;
    }

    for (const producto of lista) {
        const precioUnitario = precioANumero(producto.precio);
        const subtotal = precioUnitario * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${formatearPrecio(precioUnitario)}</td>
            <td>
                <div class="d-flex align-items-center justify-content-center gap-2">
                    <button class="btn btn-sm btn-outline-light btn-restar">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn btn-sm btn-outline-light btn-sumar">+</button>
                </div>
            </td>
            <td>$${formatearPrecio(subtotal)}</td>
            <td><button class="btn btn-sm btn-danger btn-eliminar">Eliminar</button></td>
        `;

        fila.querySelector(".btn-sumar").addEventListener("click", function () {
            cambiarCantidad(producto.codigo, 1);
        });
        fila.querySelector(".btn-restar").addEventListener("click", function () {
            cambiarCantidad(producto.codigo, -1);
        });
        fila.querySelector(".btn-eliminar").addEventListener("click", function () {
            eliminarProducto(producto.codigo);
        });

        cuerpoCarrito.appendChild(fila);
    }

    totalCarritoEl.textContent = formatearPrecio(total);
}

renderizarCarrito();