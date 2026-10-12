import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './components/Inicio';

const Productos = () => <div className="text-white p-5 text-center"><h2>Página de Productos</h2><p>En construcción...</p></div>;
const Contacto = () => <div className="text-white p-5 text-center"><h2>Página de Contacto</h2><p>En construcción...</p></div>;
const Registro = () => <div className="text-white p-5 text-center"><h2>Página de Registro</h2><p>En construcción...</p></div>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;