import React from "react";
import { useNavigate } from "react-router-dom";
import "./Catalogo.css";

const Catalogo = () => {
  const navigate = useNavigate();  // Hook de React Router para redirigir
  const productos = [ /* tu lista de productos */ ];

  const handleClickProducto = (id) => {
    navigate(`/product/${id}`);  // Redirigir a la página del producto
  };

  return (
    <div className="catalogo-container">
      <header className="catalogo-header">
        <h1>Catálogo</h1>
        <div className="ordenar">
          <label htmlFor="ordenar">Ordenar por:</label>
          <select id="ordenar">
            <option value="menor-mayor">Precio: menor a mayor</option>
            <option value="mayor-menor">Precio: mayor a menor</option>
          </select>
        </div>
      </header>

      <div className="catalogo-content">
        <section className="productos">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card" onClick={() => handleClickProducto(producto.id)}>
              <img
                src={producto.imagen}
                alt={`Imagen de ${producto.nombre}`}
                className="producto-imagen"
              />
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-marca">{producto.marca}</p>
              <p className="producto-precio">S/{producto.precio}</p>
              <button className="producto-agregar">Agregar al carrito</button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Catalogo;