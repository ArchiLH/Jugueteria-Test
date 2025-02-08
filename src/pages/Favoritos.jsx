import { useFavoritos } from "../context/FavoritosContext";
import { useCart } from "../context/CartContext";
import BannerCategoria from "../components/banner/BannerCategoria";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function Favoritos() {
  const { favorites, toggleFavorite } = useFavoritos();
  const { addItem, cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar la adición al carrito
  const handleAddToCart = (product) => {
    setIsLoading(true);
    const itemInCart = cart.find((item) => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;

    if (quantityInCart >= product.stock) {
      toast.warning("No hay más stock disponible");
      setIsLoading(false);
      return;
    }

    addItem(product);
    toast.success("Producto agregado al carrito");
    setIsLoading(false);
  };

  // Función para eliminar de favoritos
  const handleRemoveFromFavorites = (product) => {
    toggleFavorite(product);
    // toast.success("Producto eliminado de favoritos");
  };

  // Si No hay ningun productos en favoritos
  if (favorites.length === 0) {
    return (
      <>
        <BannerCategoria
          url_imagen="https://images.pexels.com/photos/168866/pexels-photo-168866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          nombreCategoria="Mis Favoritos"
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            No tienes favoritos guardados
          </h2>
          <p className="text-gray-600 mb-6">
            ¡Agrega algunos productos a tus favoritos!
          </p>
          <Link
            to="/product-catalog"
            className="inline-block bg-green-500 text-white px-4 py-2.5 rounded-lg font-bold
                                 hover:bg-green-600 transition-colors duration-200"
          >
            Explorar Productos
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <BannerCategoria
        url_imagen="https://images.pexels.com/photos/168866/pexels-photo-168866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        nombreCategoria="Mis Favoritos"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => {
            const itemInCart = cart.find((item) => item.id === product.id);
            const quantityInCart = itemInCart ? itemInCart.quantity : 0;
            const stockDisponible = product.stock - quantityInCart;

            const renderStockStatus = () => {
              if (stockDisponible <= 0) {
                return (
                  <span className="text-red-500 text-sm font-medium">
                    Agotado
                  </span>
                );
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

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden
                               hover:shadow-lg transition-shadow duration-200"
              >
                {/* Contenido del producto */}
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain p-4"
                    />
                  </Link>

                  {/* aviso de stock en imagen */}
                  {stockDisponible <= 5 && stockDisponible > 0 && (
                    <div
                      className="absolute top-2 right-2 bg-orange-100 text-orange-800
                                        text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {/* ¡Solo {stockDisponible} disponibles! */}
                      Últimas unidades
                    </div>
                  )}
                  {stockDisponible === 0 && (
                    <div
                      className="absolute top-2 right-2 bg-red-100 text-red-800
                                        text-xs font-medium px-3 py-1 rounded-full"
                    >
                      Agotado
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h4
                      className="text-lg font-semibold mb-2 hover:text-green-600
                                       transition-colors duration-200"
                    >
                      {product.name}
                    </h4>
                  </Link>
                  <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                  <div>
                    <span className="text-green-600 font-bold text-lg">
                      S/ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center my-2 mb-2">
                    {renderStockStatus()}
                    {/* {quantityInCart > 0 && (
                      <span className="text-sm text-gray-500">
                        {quantityInCart} en carrito
                      </span>
                    )} */}
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isLoading || stockDisponible <= 0}
                      className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
                                      ${
                                        stockDisponible <= 0
                                          ? "bg-gray-300 cursor-not-allowed"
                                          : "bg-green-500 hover:bg-green-600"
                                      } text-white transition-colors duration-200`}
                    >
                      <FaShoppingCart />
                      {stockDisponible <= 0 ? "Agotado" : "Agregar al Carrito"}
                    </button>
                    <button
                      onClick={() => handleRemoveFromFavorites(product)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg
                                     transition-colors duration-200"
                      title="Eliminar de favoritos"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Favoritos;
