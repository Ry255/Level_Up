import React from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data';

const Inicio = () => {
  return (
    <>
      <div className="container text-center py-5">
        <h1 className="text-success">LEVEL-UP GAMER</h1>
        <p className="text-secondary">Los mejores productos para gamers en Chile.</p>
        <Link to="/productos" className="btn btn-success">Ver Catálogo</Link>
      </div>

      <div className="container">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="row">
          {productos.slice(0, 4).map((producto) => (
            <div className="col-md-3 mb-3" key={producto.codigo}>
              <div className="card p-3 text-center">
                <img src={producto.img} className="card-img-top" alt={producto.nombre} style={{ height: '150px', objectFit: 'contain' }} />
                <div className="card-body">
                  <h5 className="card-title text-white">{producto.nombre}</h5>
                  <p className="card-text text-success">${producto.precio} CLP</p>
                  <Link to="/productos" className="btn btn-primary w-100">Ver detalle</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inicio;