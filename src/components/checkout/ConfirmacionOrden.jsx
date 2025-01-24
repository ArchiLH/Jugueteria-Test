import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ConfirmacionOrden() {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Intentar obtener los detalles del pedido del sessionStorage
    const savedOrderDetails = sessionStorage.getItem("lastOrderDetails");

    if (savedOrderDetails) {
      setOrderDetails(JSON.parse(savedOrderDetails));
    } else if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    }
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Cabecera */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-gray-700">
            Tu pedido ha sido procesado con éxito.
          </p>
        </div>

        {/* Detalles del Pedido */}
        {orderDetails && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>

            {/* Información del Pedido */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Número de Pedido:</p>
                  <p className="font-medium">{orderDetails.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha:</p>
                  <p className="font-medium">
                    {new Date(orderDetails.fecha).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Estado:</p>
                  <p className="font-medium text-green-600">
                    {orderDetails.estado[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de Productos */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Productos</h3>
              <div className="border rounded-lg">
                {orderDetails.productos.map((producto, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 ${
                      index !== orderDetails.productos.length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {producto.imagen && (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {producto.cantidad}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      S/. {(producto.precio * producto.cantidad).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de Costos */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span>S/. {orderDetails.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>S/. {orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Botones de Acción */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/product-catalog"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Seguir Comprando
          </Link>
          <Link
            to="/mi-cuenta"
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Ver Mis Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacionOrden;
