import React, { useState, useEffect } from "react";
import ProductCard from "../components/catalogo/ProductCard";
import Filtros from "../components/catalogo/Filtros";
import BannerCategoria from "../components/banner/BannerCategoria";

function CatalogoProductos() {
  // Estado para los productos siginifica que se inicializa con un array vacio y se usa para actualizar los productos vienen de la API
  const [products, setProducts] = useState([]);
  // Estado para los filtros, se inicializa con un objeto vacio y se usa para actualizar los filtros
  const [filters, setFilters] = useState({
    categorias: [],
    marcas: [],
    precio: [],
  });
  const [orden, setOrden] = useState(""); // Estado para el orden de los productos
  const [error, setError] = useState(null); // Estado para manejar errores

  // se usa useEffect para que se ejecute una vez que se renderiza el componente y se usa fetch para hacer la solicitud a la API
  // y se usa then para manejar la respuesta y catch para manejar el error
  // y se usa setProducts para actualizar el estado de los productos significa que se actualiza el estado de los productos con los datos que se obtienen de la API
  // y se usa Array.isArray para verificar que los datos sean un array y si no lo son se muestra un error
  // y se usa setError para actualizar el estado del error y mostrar el error en la consola
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
      .catch((error) =>
        setError(`Error al obtener los productos: ${error.message}`),
      );
  }, []);

  // Función para manejar el cambio de filtros de categoría, marca y precio esto es para que se pueda seleccionar y deseleccionar los filtros
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const array = [...prevFilters[filterType]];
      const index = array.findIndex((item) => {
        if (filterType === "categorias") return item === value;
        if (filterType === "marcas") return item === value;
        if (filterType === "precio") return item === value;
        return false;
      });
      if (index !== -1) {
        array.splice(index, 1);
      } else {
        array.push(value);
      }
      return {
        ...prevFilters,
        [filterType]: array,
      };
    });
  };

  // Función para manejar el cambio de orden
  const handleOrdenChange = (event) => {
    setOrden(event.target.value);
  };

  // Función para filtrar y ordenar los productos
  const filterProducts = () => {
    if (products.length === 0) return []; // Retorna un array vacío si no hay productos aún

    let filteredProducts = products;

    // Filtros de categorías
    if (filters.categorias.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categorias.includes(product.categoria),
      );
    }

    // Filtro de marcas
    if (filters.marcas.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.marcas.includes(product.brand),
      );
    }

    // Filtro de precio
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

  const filteredProducts = filterProducts(); // Obtener los productos filtrados

  // Renderizar los productos
  if (error) {
    return <div>{error}</div>;
  }

  if (!products.length && !error) {
    return <div>Cargando productos...</div>;
  }

  return (
    <>
      <BannerCategoria
        url_imagen="https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        nombreCategoria="Catalogo de Juguetes"
      />
      <div className="container mx-auto px-4 py-8 bg-gray-100">
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

        <div className="flex gap-6 ">
          {/* Filtros para el catálogo  */}
          <Filtros filters={filters} handleFilterChange={handleFilterChange} />

          {/* Lista de productos */}
          <section className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow ml-4 ">
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
    </>
  );
}

export default CatalogoProductos;
