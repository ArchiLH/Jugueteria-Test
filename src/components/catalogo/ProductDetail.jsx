import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';  // Importa useEffect
import { useCart } from '../../context/CartContext';
import { useFavoritos } from '../../context/FavoritosContext';
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductDetail() {
  const { id } = useParams();  // Obtiene el parámetro id de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem, cart } = useCart(); // Obtenemos las funciones del contexto
  const { toggleFavorite, isFavorite } = useFavoritos(); // Obtenemos las funciones del contexto de favoritos
  const [isAdding, setIsAdding] = useState(false);  

  // Verificar si el producto ya está en el carrito
  const itemInCart = cart.find((item) => item.id === product?.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const productIsFavorite = isFavorite(product?.id); // Verifica si el producto es favorito o no 

  // Manejador para agregar al carrito
  const handleAddToCart = (e) => {
    e.preventDefault(); // Previene la navegación del Link
    setIsAdding(true);
    addItem(product);

    // Resetea el estado después de un momento
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };


  useEffect(() => {
    // Realiza la solicitud para obtener el producto específico con el id
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar el producto');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);  // El hook se ejecutará nuevamente si el id cambia

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

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
            <span className="text-gray-600 ml-2">
              S/ {product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-500 text-sm">Código: {product.code}</p>

          {/* Sección de Descripción */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Descripción</h3>
            <p className="text-gray-600 text-sm">{product.descripcion}</p>
          </div>

          <div className="mt-6">
            {/* Botón de agregar al carrito */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full font-bold py-2 px-4 rounded transition-all flex items-center justify-center gap-2 ${isAdding
                ? "bg-green-700 text-white cursor-not-allowed opacity-75"
                : "bg-green-500 hover:bg-green-600 text-white"
                }`}
            >
              <FaShoppingCart size={16} />
              {isAdding
                ? "¡Agregado!"
                : quantityInCart > 0
                  ? "Agregar más"
                  : "Agregar al Carrito"}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product);
              }}
              className={`text-gray-500 hover:text-red-500 flex items-center p-2 transition-colors ${productIsFavorite ? "text-red-500" : ""
                }`}
            >
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
