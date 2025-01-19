import React, { useState, useEffect } from "react";
import ProductCard from "../components/catalogo/ProductCard";
import Filtros from "../components/catalogo/Filtros";

function CatalogoProductos() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    categorias: [],
    marcas: [],
    precio: [],
  });
  const [orden, setOrden] = useState("");
  const [error, setError] = useState(null);

  // Obtener productos desde la API
  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Los datos de productos no son válidos.");
        }
      })
      .catch((error) => setError(`Error al obtener los productos: ${error.message}`));
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const handleOrdenChange = (event) => {
    setOrden(event.target.value);
  };

  const filterProducts = () => {
    if (products.length === 0) return []; // Retorna un array vacío si no hay productos aún

    let filteredProducts = products;

    // Filtros de categorías, marcas y precio
    if (filters.categorias.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categorias.includes(product.categoria)
      );
    }

    if (filters.marcas.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.marcas.includes(product.brand)
      );
    }

    if (filters.precio.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.price);
        return filters.precio.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return price >= min && (max ? price <= max : price >= min);
        });
      });
    }

    // Ordenar productos por precio
    if (orden === "menor-mayor") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (orden === "mayor-menor") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts();

  if (error) {
    return <div>{error}</div>;
  }

  if (!products.length && !error) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Catálogo</h1>
        <div className="flex items-center">
          <label htmlFor="ordenar" className="mr-2 text-gray-600">
            Ordenar por:
          </label>
          <select
            id="ordenar"
            className="border border-gray-300 rounded px-3 py-1"
            value={orden}
            onChange={handleOrdenChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="menor-mayor">Precio: menor a mayor</option>
            <option value="mayor-menor">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      <div className="flex">
        <Filtros filters={filters} handleFilterChange={handleFilterChange} />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow ml-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No se encontraron productos</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default CatalogoProductos;
