function mostrarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    
    for (let i = 0; i < 4; i++) {
        const producto = productos[i];
        
        const tarjeta = `
            <div class="col-md-3 mb-3">
                <div class="card p-3 text-center">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}" style="height: 150px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title text-white">${producto.nombre}</h5>
                        <p class="card-text text-success">$${producto.precio} CLP</p>
                        <a href="../productos/detalle.html?codigo=${producto.codigo}" class="btn btn-primary w-100">Ver detalle</a>
                    </div>
                </div>
            </div>
        `;
        
        contenedor.innerHTML += tarjeta;
    }
}

document.addEventListener('DOMContentLoaded', mostrarProductos);

//Falto agregar comentarios pa no perderse- work in progress