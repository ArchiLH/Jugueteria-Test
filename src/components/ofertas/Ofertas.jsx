import { useState, useEffect } from "react";
import ProductCard from "../catalogo/ProductCard";
import BannerCategoria from "../banner/BannerCategoria";

function Ofertas() {
  const [ofertasProductos, setOfertasProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        // URL modificada para apuntar al nuevo endpoint de ofertas
        const response = await fetch(
          "http://localhost:8080/api/productos/ofertas",
        ); // Ya no necesitamos el parámetro categoria=Ofertas, el endpoint ya filtra
        if (!response.ok) {
          throw new Error("Error al cargar las ofertas");
        }
        const data = await response.json();
        setOfertasProductos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  // if (loading) {
  //   return <p>Cargando ofertas...</p>;
  // }

  // if (error) {
  //   return <p>Error al cargar ofertas: {error}</p>;
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <BannerCategoria
        url_imagen="https://images.pexels.com/photos/163696/toy-car-toy-box-mini-163696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        nombreCategoria="🎟️ ¡Ofertas Imperdibles! 🎁"
      />

      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-xl font-bold text-primary mb-4 text-center">
          {/* Añadido text-center */}
          Descubre los mejores juguetes a precios increíbles:
        </h1>
        {/* Contenedor principal para el texto y la grilla */}
        <div className="flex flex-col flex-grow p-4  items-center">
          {/* Añadido items-center para centrar horizontalmente */}

          {/* Grilla de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl">
            {/* Añadido max-w-7xl para limitar el ancho */}
            {ofertasProductos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ofertas;
