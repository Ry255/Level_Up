const LLAVE = "carrito_shop";

const cuerpoCarrito = document.getElementById("cuerpoCarrito");
const totalCarritoEl = document.getElementById("totalCarrito");


function precioANumero(precioTexto) {
    return parseInt(precioTexto.replace(/\./g, ""), 10);
}

function formatearPrecio(numero) {
    return numero.toLocaleString("es-CL");
}

function agruparProductos(lista) {
    const agrupado = {};
    for (const producto of lista) {
        if (agrupado[producto.codigo]) {
            agrupado[producto.codigo].cantidad += 1;
        } else {
            agrupado[producto.codigo] = { ...producto, cantidad: 1 };
        }
    }
    return Object.values(agrupado);
}

function renderizarCarrito() {
    const storageActual = localStorage.getItem(LLAVE);
    const lista = storageActual ? JSON.parse(storageActual) : [];

    cuerpoCarrito.innerHTML = "";
    let total = 0;

    if (lista.length === 0) {
        cuerpoCarrito.innerHTML = `<tr><td colspan="5" class="text-center">El carrito está vacío</td></tr>`;
        totalCarritoEl.textContent = "0";
        return;
    }

    const productosAgrupados = agruparProductos(lista);

    for (const producto of productosAgrupados) {
        const precioUnitario = precioANumero(producto.precio);
        const subtotal = precioUnitario * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${formatearPrecio(precioUnitario)}</td>
            <td>${producto.cantidad}</td>
            <td>$${formatearPrecio(subtotal)}</td>
        `;
        cuerpoCarrito.appendChild(fila);
    }

    totalCarritoEl.textContent = formatearPrecio(total);
}

renderizarCarrito();