const LLAVE = "carrito_shop";

const section = document.getElementById("prueba");
console.log(section);

const contenedorCard = document.createElement("div");
contenedorCard.className = "contenedor-card";

productos = [
    {
        "codigo":"JM001",
        "categoria":"Juego de Mesa",
        "nombre":"catan",
        "precio":"29.990",
        "imagen":"img/catan.jpeg"
    },
    {
        "codigo":"JM002",
        "categoria":"Juego de Mesa",
        "nombre":"carcassonne",
        "precio":"24.990",
        "imagen":"img/carcassonne.jpeg"
    },
    {
        "codigo":"AC001",
        "categoria":"Accesorios",
        "nombre":"Controlador Inalámbrico Xbox Series X",
        "precio":"59.990",
        "imagen":"img/Controlador.jpg"
    },
    {
        "codigo":"AC002",
        "categoria":"Accesorios",
        "nombre":"Auriculares Gamer HyperX Cloud II",
        "precio":"79.990",
        "imagen":"img/auriculares.jpg"
    },
    {
        "codigo":"CO001",
        "categoria":"Consolas",
        "nombre":"PlaStation 5",
        "precio":"549.990",
        "imagen":"img/Play.jpg"  
    },
    {
        "codigo":"CG001",
        "categoria":"Computadores Gamers",
        "nombre":"PC Gamer ASUS ROG Strixtation",
        "precio":"1.299.990",
        "imagen":"img/compu.png"

    },
    {
        "codigo":"SG001",
        "categoria":"Silla Gamers",
        "nombre":"Silla Gamer Secretlab Titan",
        "precio":"349.990",
        "imagen":"img/silla.webp"
    },
    {
        "codigo":"MS001",
        "categoria":"Mouse",
        "nombre":"Mouse Gamer Logitech G502 HERO",
        "precio":"49.990",
        "imagen":"img/Mouse.jpeg"
    },
    {
        "codigo":"MP001",
        "categoria":"Mousepad",
        "nombre":"Mousepad Razer Goliathus Extended",
        "precio":"29.990",
        "imagen":"img/pad.jpg"

    },
    {
        "codigo":"PP001",
        "categoria":"Poleras Personalizadas",
        "nombre":"Polera Gamer Personalizada 'Level-Up'",
        "precio":"14.990",
        "imagen":"img/poleras.webp"

    }

]

for (const i of productos) {


    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = "card";
    contenedorCard.appendChild(nuevoDiv);

    const tituloProducto = document.createElement("h1");
    tituloProducto.textContent = i.nombre;
    nuevoDiv.appendChild(tituloProducto);

    const imgProducto = document.createElement("img");
    imgProducto.src = i.imagen;
    imgProducto.className = "imgProducto";
    nuevoDiv.appendChild(imgProducto);

    const precioProducto = document.createElement("h3");
    precioProducto.textContent = i.precio;
    nuevoDiv.appendChild(precioProducto);

    const btnAgregarCarro = document.createElement("button");
    btnAgregarCarro.textContent = "Agregar al carrito";
    btnAgregarCarro.className = "btn btn-primary mt-3";
    btnAgregarCarro.addEventListener("click", function(){
        //alert(i.i);
        guardarProducto(i);
    })
    nuevoDiv.appendChild(btnAgregarCarro);

}



function guardarProducto(producto) {
    var storageActual = localStorage.getItem(LLAVE);
    var lista = [];
    if (storageActual != null) {
        lista = JSON.parse(storageActual);
    }
    lista.push(producto);
    localStorage.setItem(LLAVE, JSON.stringify(lista));
}

