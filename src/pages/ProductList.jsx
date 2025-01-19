import React from "react";
import { useNavigate } from "react-router-dom";
import { productos } from "../data/productos";

function ProductList() {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <div className="grid grid-cols-2 gap-4">
        {productos.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={`Imagen de ${product.name}`}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-green-600 font-bold">
              S/ {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;