import { Link } from "react-router-dom";

function CategoriasDestacadas() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl text-center font-semibold mb-8">
        Categorías Destacadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1603354351149-e97b9124020d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Juguetes Educativos"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Juguetes Educativos</h3>
            <p className="text-sm text-gray-600 mb-4">
              Construye tu imaginación
            </p>
            <Link
              to="product-catalog"
              className="inline-flex items-center px-4 py-2 bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white rounded-lg transition duration-200"
            >
              Explorar →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1619898488318-dbac5f2a44b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Juguetes de Construcción"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Juegos de Mesa</h3>
            <p className="text-sm text-gray-600 mb-4">
              Aprende mientras juegas
            </p>
            <Link
              to="product-catalog"
              className="inline-flex items-center px-4 py-2 bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white rounded-lg transition duration-200"
            >
              Explorar →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1722498256995-fcc480892dfd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Juguetes de Aventura"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Figuras de Accion</h3>
            <p className="text-sm text-gray-600 mb-4">Figuras Coleccionables</p>
            <Link
              to="product-catalog"
              className="inline-flex items-center px-4 py-2 bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white rounded-lg transition duration-200"
            >
              Explorar →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriasDestacadas;
