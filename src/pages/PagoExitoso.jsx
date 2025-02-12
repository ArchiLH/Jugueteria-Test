import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function PagoExitoso() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg  p-8 text-center">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 w-16 h-16" />
          </div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ¡Pago Realizado con Éxito!
          </h2>
          <p className="text-gray-700 mb-6">
            Gracias por tu compra. Tu pedido ha sido procesado y se está
            preparando para ser enviado.
          </p>
          {/* Opcional: Mostrar resumen del pedido aquí si tienes los datos disponibles */}
          {/* <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Resumen del Pedido</h3>
            <p className="text-gray-600">Número de pedido: {/* Aquí el número de pedido * /}</p>
            <p className="text-gray-600">Total pagado: {/* Aquí el total pagado * /}</p>
             </div> */}
          <div className="space-x-4 mt-8">
            <Link
              to="/product-catalog"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Seguir Comprando
            </Link>
            <Link
              to="/mi-cuenta"
              className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Ver Mis Pedidos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PagoExitoso;
