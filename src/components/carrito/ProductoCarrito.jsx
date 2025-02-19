import { useState, useEffect } from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductoCarrito({ producto, onRemove, onUpdateQuantity }) {
  const [quantity, setQuantity] = useState(producto.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [disponibles, setDisponibles] = useState(
    producto.stock - producto.quantity,
  );

  // Actualizar disponibles cuando cambia la cantidad
  useEffect(() => {
    setDisponibles(producto.stock - quantity);
  }, [producto.stock, quantity]);

  const handleQuantityUpdate = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > producto.stock) return;
    setIsUpdating(true);
    setQuantity(newQuantity);

    // Actualiza la cantidad en el carrito
    onUpdateQuantity(newQuantity);

    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleInputChange = (e) => {
    let newValue = Number(e.target.value);
    if (newValue < 1) {
      toast.warning("La cantidad debe ser al menos 1");
      newValue = 1;
    } else if (newValue > producto.stock) {
      toast.warning(`Solo hay ${producto.stock} unidades disponibles`);
      newValue = producto.stock;
    }
    setQuantity(newValue);
    onUpdateQuantity(newValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-4">
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

        <div className="flex-grow">
          <Link
            to={`/product/${producto.id}`}
            className="text-lg font-semibold hover:text-green-600"
          >
            {producto.name}
          </Link>
          <p className="text-gray-600 text-sm">{producto.brand}</p>

          {/* Indicador de stock */}
          <div className="mt-1">
            {/* <span className="text-sm">Stock: {producto.stock}</span> */}
            <span
              className={`text-sm  ${disponibles <= 5 ? "text-red-500" : "text-green-500"}`}
            >
              {disponibles === 0
                ? "Agotado"
                : disponibles <= 5
                  ? `¡Solo quedan ${disponibles} disponibles!`
                  : `Stock: ${disponibles}`}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityUpdate(quantity - 1)}
                disabled={isUpdating || quantity <= 1}
                className={`p-2 ${quantity <= 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
              >
                <FaMinus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min="1"
                max={producto.stock}
                value={quantity}
                onChange={handleInputChange}
                disabled={isUpdating}
                className={`w-16 text-center border-x px-2 py-1 ${isUpdating ? "cursor-not-allowed bg-gray-100" : ""}`}
              />

              <button
                onClick={() => handleQuantityUpdate(quantity + 1)}
                disabled={isUpdating || quantity >= producto.stock}
                className={`p-2 ${quantity >= producto.stock ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
              >
                <FaPlus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <div className="text-right">
          {/* Condicional para mostrar precio con descuento en el carrito */}
          {producto.categoria === "Ofertas" ? (
            <div>
              <p className="text-sm text-gray-500">
                S/ {producto.price.toFixed(2)} x {quantity}
              </p>
              <div className="flex gap-3 content-center items-center">
                <p className="text-sm text-gray-500 line-through">
                  S/ {(producto.price / 0.8).toFixed(2)}{" "}
                </p>
                <p className="font-bold text-lg text-green-600">
                  S/ {(producto.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">
                S/ {producto.price.toFixed(2)} x {quantity}
              </p>
              <p className="font-bold text-lg text-green-600">
                S/ {(producto.price * quantity).toFixed(2)}
              </p>
            </div>
          )}
          {/* <p className="text-sm text-gray-500">
            S/ {producto.price.toFixed(2)} x {quantity}
          </p>
          <p className="font-bold text-lg text-green-600">
            S/ {(producto.price * quantity).toFixed(2)}
          </p> */}
          {/* <p className="text-sm text-gray-500 mt-1">
            Disponibles: {producto.stock}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default ProductoCarrito;
