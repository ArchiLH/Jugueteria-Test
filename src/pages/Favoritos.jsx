import React from "react";
import { useFavoritos } from "../context/FavoritosContext";
import { useCart } from "../context/CartContext";
import BannerCategoria from "../components/banner/BannerCategoria";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Favoritos() {
  const { favorites, toggleFavorite } = useFavoritos();
  const { addItem } = useCart();

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
          <p className="text-gray-600">
            ¡Agrega algunos productos a tus favoritos!
          </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Contenido clickeable que lleva al detalle */}
              <Link
                to={`/product/${product.id}`}
                className="block p-4 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                <p className="text-green-600 font-bold text-xl mb-4">
                  S/ {product.price.toFixed(2)}
                </p>
              </Link>

              {/* Botones de Agregar y Eliminar */}
              <div className="p-4 pt-0">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(product);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Agregar al Carrito
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product);
                    }}
                    className="font-bold py-2 px-4 text-red-500 hover:bg-red-600 hover:text-white rounded"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Favoritos;
