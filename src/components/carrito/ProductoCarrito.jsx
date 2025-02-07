import { useState } from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductoCarrito({ producto, onRemove, onUpdateQuantity }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const MAX_QUANTITY = 5;

  const decrementQuantity = () => {
    if (producto.quantity > 1) {
      handleQuantityUpdate(producto.quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (producto.quantity < MAX_QUANTITY) {
      handleQuantityUpdate(producto.quantity + 1);
    }
  };

  const handleQuantityUpdate = (newQuantity) => {
    if (newQuantity > producto.stock) {
      toast.warning(`Solo hay ${producto.stock} unidades disponibles`);
      return;
    }

    onUpdateQuantity(newQuantity);
  };

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow">
      <img
        src={producto.image}
        alt={producto.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-grow ml-4">
        <h3 className="font-semibold">{producto.name}</h3>
        <p className="text-gray-600 text-sm">{producto.brand}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={decrementQuantity}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            disabled={producto.quantity <= 1}
          >
            <FaMinus className="w-3 h-3" />
          </button>

          <input
            type="number"
            min="1"
            max={MAX_QUANTITY}
            value={producto.quantity}
            onChange={(e) => handleQuantityUpdate(Number(e.target.value))}
            className="w-16 text-center border-x px-2 py-1"
          />

          <button
            onClick={incrementQuantity}
            className={`px-3 py-1 ${
              producto.quantity >= MAX_QUANTITY
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <FaPlus className="w-3 h-3" />
          </button>

          <button
            onClick={onRemove}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">
          S/ {producto.price.toFixed(2)} x {producto.quantity}
        </p>
        <p className="font-bold text-lg text-green-600">
          S/ {(producto.price * producto.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductoCarrito;
