import { useState } from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductoCarrito({ producto, onRemove, onUpdateQuantity }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityUpdate = (newQuantity) => {
    if (newQuantity < 1) return;

    if (newQuantity > producto.stock) {
      toast.warning(`Solo hay ${producto.stock} unidades disponibles`);
      return;
    }

    setIsUpdating(true);
    onUpdateQuantity(newQuantity);
    setTimeout(() => setIsUpdating(false), 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-4">
        {/* Imagen y Link al producto */}
        <Link
          to={`/product/${producto.id}`}
          className="w-24 h-24 flex-shrink-0"
        >
          <img
            src={producto.image}
            alt={producto.name}
            className="w-full h-full object-contain rounded"
          />
        </Link>

        {/* Información del producto */}
        <div className="flex-grow">
          <Link
            to={`/product/${producto.id}`}
            className="text-lg font-semibold hover:text-green-600 transition-colors duration-200"
          >
            {producto.name}
          </Link>
          <p className="text-gray-600 text-sm">{producto.brand}</p>

          {/* Indicador de stock */}
          {producto.stock <= 5 && (
            <p className="text-orange-500 text-sm mt-1">
              ¡Solo quedan {producto.stock} unidades!
            </p>
          )}

          {/* Control de cantidad */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityUpdate(producto.quantity - 1)}
                disabled={isUpdating || producto.quantity <= 1}
                className={`p-2 ${
                  producto.quantity <= 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                } rounded-l-lg transition-colors`}
              >
                <FaMinus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min="1"
                max={producto.stock}
                value={producto.quantity}
                onChange={(e) => handleQuantityUpdate(Number(e.target.value))}
                className="w-16 text-center border-x px-2 py-1"
              />

              <button
                onClick={() => handleQuantityUpdate(producto.quantity + 1)}
                disabled={isUpdating || producto.quantity >= producto.stock}
                className={`p-2 ${
                  producto.quantity >= producto.stock
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                } rounded-r-lg transition-colors`}
              >
                <FaPlus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        {/* Precios */}
        <div className="text-right">
          <p className="text-sm text-gray-500">
            S/ {producto.price.toFixed(2)} x {producto.quantity}
          </p>
          <p className="font-bold text-lg text-green-600">
            S/ {(producto.price * producto.quantity).toFixed(2)}
          </p>

          {/* Stock disponible */}
          <p className="text-sm text-gray-500 mt-1">
            Disponibles: {producto.stock}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductoCarrito;
