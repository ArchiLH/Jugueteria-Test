import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";

function MisPedidos() {
  const pedidos = []; // Array vacío para simular que no hay pedidos

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Mis Pedidos</h2>

      {pedidos.length === 0 ? (
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
            Ir a Comprar
          </Link>
        </div>
      ) : (
        // Aquí irá el código para mostrar la lista de pedidos cuando existan
        <div className="space-y-4">
          {/* El mapeo de pedidos irá aquí cuando se implemente */}
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
