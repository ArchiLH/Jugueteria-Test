import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

function PagoCancelado() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg  p-8 text-center">
          <div className="flex justify-center mb-4">
            <FaTimesCircle className="text-red-500 w-16 h-16" />
          </div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Pago Cancelado
          </h2>
          <p className="text-gray-700 mb-6">
            Tu pago ha sido cancelado. Por favor, revisa tu carrito e intenta
            nuevamente o elige otro método de pago.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to="/carrito"
              className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Volver al Carrito
            </Link>
            <Link
              to="/product-catalog"
              className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PagoCancelado;
