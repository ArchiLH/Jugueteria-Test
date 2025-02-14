import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { useState, useEffect } from "react";
import { pedidoService } from "../../api/pedidoService";

function MisPedidos() {
  //const pedidos = []; // Array vacío para simular que no hay pedidos
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true); // Inicia el loading
      setError(null); // Resetea errores al inicio de la carga
      try {
        const userId = localStorage.getItem("id");
        if (!userId) {
          throw new Error("No hay ID de usuario en localStorage");
        }

        const fetchedPedidos =
          await pedidoService.obtenerPedidosUsuario(userId); // Llama al servicio para obtener pedidos
        setPedidos(fetchedPedidos); // Actualiza el estado con los pedidos obtenidos
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
        setError(
          "Error al cargar el historial de pedidos. Por favor, intenta nuevamente.",
        ); // Establece el error
      } finally {
        setLoading(false); // Finaliza el loading, sin importar el resultado
      }
    };

    fetchPedidos();
  }, []); // El useEffect se ejecuta una sola vez al montar el componente

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error: {error}</p>
        <p>{error}</p>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <BiTask className="mx-auto h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aún no tienes pedidos realizados
        </h3>
        <p className="text-gray-500 mb-4">
          Realiza tu primera compra y podrás ver tus pedidos aquí
        </p>
        <Link
          to="/product-catalog"
          className="inline-flex items-center px-4 py-2 border border-transparent
                       rounded-md shadow-sm text-sm font-medium text-white
                       bg-green-600 hover:bg-green-700 transition-colors duration-200"
        >
          Ir a Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Historial de Pedidos</h2>
      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">
                Pedido #{pedido.numeroOrden}
              </h3>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(pedido.fecha).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                pedido.estado === "COMPLETADO"
                  ? "bg-green-100 text-green-800"
                  : pedido.estado === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {pedido.estado}
            </span>
          </div>

          {/* Productos del pedido */}
          <div className="space-y-4">
            {pedido.detalles.map(
              (
                detalle, // Usamos pedido.detalles en lugar de pedido.productos
              ) => (
                <div
                  key={detalle.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    {detalle.imagenProducto && ( // Verificamos si imagenProducto existe
                      <img
                        src={detalle.imagenProducto}
                        alt={detalle.nombreProducto}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{detalle.nombreProducto}</h4>
                      <p className="text-sm text-gray-500">
                        Cantidad: {detalle.cantidad}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    S/ {(detalle.precioUnitario * detalle.cantidad).toFixed(2)}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Resumen del pedido */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">
                S/ {pedido.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Imprimir Pedido
            </button>
            <Link
              to={`/pedido/${pedido.id}`}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MisPedidos;
