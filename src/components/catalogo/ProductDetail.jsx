import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Importa useEffect
import { useCart } from "../../context/CartContext";
import { useFavoritos } from "../../context/FavoritosContext";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductDetail() {
  // Hooks basicos
  const { id } = useParams(); // Obtiene el parámetro id de la URL
  const { addItem, cart } = useCart(); // Obtenemos las funciones del contexto
  const { toggleFavorite, isFavorite } = useFavoritos(); // Obtenemos las funciones del contexto de favoritos

  // estados
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [stockDisponible, setStockDisponible] = useState(0);

  // calcular derivados
  const itemInCart = cart.find((item) => item.id === product?.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;
  const productIsFavorite = isFavorite(product?.id); // Verifica si el producto es favorito o no

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/${id}`,
        );
        if (!response.ok) {
          throw new Error("Error al cargar el producto");
        }
        const data = await response.json();
        setProduct(data);
        setStockDisponible(data.stock - quantityInCart);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, quantityInCart]);

  // Manejadores de eventos
  const handleAddToCart = () => {
    if (stockDisponible <= 0) {
      toast.error("Producto agotado");
      return;
    }

    setIsAdding(true);
    addItem(product);
    toast.success("Producto agregado al carrito");

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  // Renderizado condicional
  if (loading) {
    return <div className="text-center py-8">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Producto no encontrado</div>;
  }

  // Función para renderizar el estado del stock
  const renderStockStatus = () => (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        {stockDisponible <= 0 ? (
          <span className="text-red-500 font-medium py-1 px-3 bg-red-50 rounded-full">
            Agotado
          </span>
        ) : stockDisponible <= 5 ? (
          <span className="text-orange-500 font-medium py-1 px-3 bg-orange-50 rounded-full">
            ¡Solo quedan {stockDisponible} unidades!
          </span>
        ) : (
          <span className="text-green-500 font-medium py-1 px-3 bg-green-50 rounded-full">
            En stock: {stockDisponible} disponibles
          </span>
        )}
      </div>
    </div>
  );

  // render principal
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <img
            src={product.image}
            alt={`Imagen de ${product.name}`}
            className="w-full rounded-lg mb-4"
          />
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
          <div className="flex mb-4">
            <span className="font-bold text-gray-700">Precio:</span>

            {/* Condicional para mostrar precio con descuento */}
            {product.categoria === "Ofertas" ? (
              <div className="ml-2 flex flex-row-reverse items-center gap-4 content-center">
                {/* Precio Original (Tachado) */}
                <span className="text-gray-500 line-through text-sm">
                  S/ {product.price.toFixed(2)}
                </span>
                {/* Precio con Descuento (Resaltado) */}
                <span className="text-green-600 font-bold">
                  S/ {(product.price * 0.8).toFixed(2)}{" "}
                  {/* Ejemplo: 20% de descuento */}
                </span>
              </div>
            ) : (
              // Si no es "Ofertas", muestra el precio normal
              <span className="text-gray-600 ml-2">
                S/ {product.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-gray-700">Código:</span>{" "}
            {product.id}
          </p>

          {/* Sección de Descripción */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Descripción:
            </h3>
            <p className="text-gray-600 text-sm">{product.descripcion}</p>
          </div>

          {renderStockStatus()}
          <div className="mt-6 flex justify-stretch content-center">
            {/* Botón de agregar al carrito */}
            <button
              onClick={handleAddToCart}
              disabled={stockDisponible <= 0}
              className={`mt-4 w-full md:w-auto px-6 py-3 rounded-lg font-semibold
                      ${
                        stockDisponible <= 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white transition-colors flex items-center justify-center gap-2`}
            >
              <FaShoppingCart />
              {stockDisponible <= 0
                ? "Agotado"
                : // : isAdding
                  // ? "Agregando..."
                  "Agregar al Carrito"}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product);
              }}
              className={`text-gray-500 hover:text-red-500 flex gap-2 items-center p-2 transition-colors ${
                productIsFavorite ? "text-red-500" : ""
              }`}
            >
              Agregar a Favoritos
              {productIsFavorite ? (
                <FaHeart size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
