import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useFavoritos } from "../../context/FavoritosContext"; // contexto de favoritos
import { useState } from "react";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { addItem, cart } = useCart(); // Obtenemos las funciones del contexto
  const { toggleFavorite, isFavorite } = useFavoritos();
  const [isAdding, setIsAdding] = useState(false); // Estado para feedback visual

  // Verificar si el producto ya está en el carrito
  const itemInCart = cart.find((item) => item.id === product.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;
  const stockDisponible = product.stock - quantityInCart;
  const productIsFavorite = isFavorite(product.id); // Verificar si el producto es favorito o no y actualizar el estado de favoritos al hacer clic en el corazón de la tarjeta de producto y mostrar el icono correspondiente. Si el producto es favorito, se muestra el corazón lleno, de lo contrario, se muestra el corazón vacío.

  const STOCK_BAJO_LIMITE = 5;

  // Función para mostrar el estado del stock
  const renderStockStatus = () => {
    if (stockDisponible <= 0) {
      return <span className="text-red-500 text-sm font-medium">Agotado</span>;
    } else if (stockDisponible <= 5) {
      return (
        <span className="text-orange-500 text-sm font-medium">
          ¡Solo quedan {stockDisponible} unidades!
        </span>
      );
    } else {
      return (
        <span className="text-green-500 text-sm font-medium">
          En stock: {stockDisponible}
        </span>
      );
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    // Verificar si hay stock disponible
    if (stockDisponible <= 0) {
      toast.error("Producto agotado");
      return;
    }

    // Verificar si agregar más unidades excedería el stock
    if (quantityInCart >= product.stock) {
      toast.warning("Has alcanzado el límite de stock disponible");
      return;
    }

    // setIsAdding(true);
    addItem(product);

    toast.success("Producto agregado al carrito");
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col h-min border rounded-lg shadow hover:shadow-lg transition-shadow no-underline bg-white"
    >
      {/* Contenedor de imagen con tamaño fijo */}
      <div className="w-full h-64 p-4 flex items-center justify-center relative">
        <img
          src={product.image}
          alt={`Imagen de ${product.name}`}
          className="max-h-full max-w-full object-contain"
        />

        {stockDisponible <= STOCK_BAJO_LIMITE && stockDisponible > 0 && (
          <div
            className="absolute top-2 right-2 bg-orange-100 text-orange-800
                          text-xs font-medium px-3 py-1 rounded-full shadow-sm
                          border border-orange-200"
          >
            {stockDisponible <= 3
              ? `¡Solo ${stockDisponible} ${stockDisponible === 1 ? "unidad" : "unidades"}!`
              : "¡Últimas unidades!"}
          </div>
        )}
      </div>

      {/* Contenedor de información del producto */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <p className="text-gray-500 uppercase text-xs">{product.brand}</p>
          <h3 className="text-lg font-semibold mt-2 truncate">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs mt-1">Código: {product.id}</p>
          {/* Indicador de stock */}
          <div className="mt-2">{renderStockStatus()}</div>
        </div>

        {/* Precio y botón de favoritos */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-green-600 font-bold">
            S/ {product.price.toFixed(2)}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product);
            }}
            className={`text-gray-500 hover:text-red-500 flex items-center p-2 transition-colors ${
              productIsFavorite ? "text-red-500" : ""
            }`}
          >
            {productIsFavorite ? (
              <FaHeart size={20} />
            ) : (
              <FaRegHeart size={20} />
            )}
          </button>
        </div>

        {/* Botón de agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || stockDisponible <= 0}
          className={`w-full font-bold py-2 px-4 rounded transition-all flex items-center justify-center gap-2
                    ${
                      isAdding
                        ? "bg-green-700 text-white cursor-not-allowed opacity-75"
                        : stockDisponible <= 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
        >
          <FaShoppingCart size={16} />
          {/* {isAdding
            ? "¡Agregado!"
            : stockDisponible <= 0
              ? "Agotado"
              : quantityInCart > 0
                ? "Agregar más"
                : "Agregar al Carrito"} */}
          {stockDisponible <= 0 ? "Agotado" : "Agregar al Carrito"}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
