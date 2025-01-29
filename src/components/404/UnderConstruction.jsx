import { Link } from "react-router-dom";

function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          ¡Página en construcción!
        </h1>
        <p className="text-gray-600 mb-8">
          Estamos trabajando en esta sección. Pronto estará disponible.
        </p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default UnderConstruction;
