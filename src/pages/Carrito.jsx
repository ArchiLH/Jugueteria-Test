import { useCart } from "../context/CartContext";
import Producto from "../components/carrito/ProductoCarrito";
import Resumen from "../components/carrito/ResumenCarrito";
import BannerCategoria from "../components/banner/BannerCategoria";
import BotonCheckout from "../components/carrito/BotonCheckout";
import { FaShoppingCart, FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Carrito() {
  // Usamos el contexto del carrito
  const { cart, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  // const decrementQuantity = () => {
  //   if (producto.quantity > 1) {
  //     handleQuantityUpdate(producto.quantity - 1);
  //   }
  // };

  // const incrementQuantity = () => {
  //   if (producto.quantity < MAX_QUANTITY) {
  //     handleQuantityUpdate(producto.quantity + 1);
  //   }
  // };

  // const handleRemoveItem = (productId) => {
  //   removeItem(productId);
  //   toast.success("Producto eliminado del carrito");
  // };

  const handleClearCart = () => {
    // if (window.confirm("¿Estás seguro de vaciar el carrito?")) {
    //   clearCart();
    //   toast.success("Carrito vaciado");
    // }
    toast.info(
      <div className="flex flex-col justify-center items-center">
        <p>¿Estás seguro de vaciar el carrito?</p>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              clearCart();
              // toast.success("Carrito vaciado");
              toast.dismiss(); // Cierra el toast de confirmación
            }}
          >
            Sí, vaciar
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => toast.dismiss()} // Cierra el toast sin hacer nada
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Evita que el toast se cierre automáticamente
        closeButton: false, // Oculta el botón de cierre por defecto
        position: "top-center",
      },
    );
  };

  // Si el carrito está vacío, mostramos un mensaje
  if (!cart || cart.length === 0) {
    return (
      <>
        <BannerCategoria
          url_imagen="https://images.pexels.com/photos/12932822/pexels-photo-12932822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          nombreCategoria="Carrito de Compras"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center bg-white rounded-lg  p-8">
            <FaShoppingCart className="mx-auto text-gray-400 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Agrega algunos productos para comenzar tu compra!
            </p>
            <Link
              to="/product-catalog"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3
                               rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <FaArrowLeft /> Continuar Comprando
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BannerCategoria
        url_imagen="https://images.pexels.com/photos/12932822/pexels-photo-12932822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        nombreCategoria="Carrito de Compras"
      />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold mb-6">
              Tu Carrito tiene: {cart.length}{" "}
              {cart.length === 1 ? "producto" : "productos"}
            </h2>
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-600 flex items-center gap-2"
            >
              <FaTrashAlt /> Vaciar Carrito
            </button>
          </div>
          <div className="space-y-4">
            {cart.map((producto) => (
              <Producto
                key={producto.id}
                producto={producto}
                onRemove={() => removeItem(producto.id)}
                onUpdateQuantity={(quantity) =>
                  updateQuantity(producto.id, quantity)
                }
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Resumen
            subtotal={subtotal}
            descuentos={0}
            total={subtotal} // Puedes ajustar esto según tu lógica de descuentos
          />
          <BotonCheckout />
        </div>
      </div>
    </>
  );
}

export default Carrito;
