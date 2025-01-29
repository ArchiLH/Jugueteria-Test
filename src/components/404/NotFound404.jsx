import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o está en
          construcción.
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

export default NotFound;
