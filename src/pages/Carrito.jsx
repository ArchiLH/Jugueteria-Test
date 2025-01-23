import { useCart } from "../context/CartContext";
import Producto from "../components/carrito/ProductoCarrito";
import Resumen from "../components/carrito/ResumenCarrito";
import BannerCategoria from "../components/BannerCategoria";
import BotonCheckout from "../components/carrito/BotonCheckout";
// import { useState } from "react";

function Carrito() {
  // Usamos el contexto del carrito
  const { cart, removeItem, updateQuantity, subtotal } = useCart();

  // Si el carrito está vacío, mostramos un mensaje
  if (!cart || cart.length === 0) {
    return (
      <>
        <BannerCategoria
          url_imagen="https://images.pexels.com/photos/12932822/pexels-photo-12932822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          nombreCategoria="Carrito de Compras"
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600">
            ¡Agrega algunos productos para comenzar!
          </p>
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
