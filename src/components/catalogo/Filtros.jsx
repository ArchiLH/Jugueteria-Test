function Filtros({ filters, handleFilterChange }) {
  const categorias = [
    { id: 1, name: "Juegos de Mesa" },
    { id: 2, name: "Juguetes Deportivos" },
    { id: 3, name: "Figuras de Accion" },
    { id: 4, name: "Muñecas" },
    { id: 5, name: "Vehiculos" },
    { id: 6, name: "Juguetes Educativos" },
    { id: 7, name: "Ofertas" },
  ];

  const marcas = [
    { id: 1, brand: "MATTEL" },
    { id: 2, brand: "HASBRO" },
    { id: 3, brand: "HOT WHEELS" },
    { id: 4, brand: "MARVEL" },
    { id: 5, brand: "BARBIE" },
    { id: 6, brand: "LEGO" },
  ];

  const precios = [
    { id: 1, range: "0-50" },
    { id: 2, range: "50-100" },
    { id: 3, range: "100-200" },
    { id: 4, range: "200-500" },
  ];

  // Función para manejar el cambio de filtros de las categorías
  const renderCategoriasCheckboxes = () => {
    return categorias.map((item) => (
      <li key={item.id} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={item.id}
          value={item.name}
          checked={filters.categorias.includes(item.name)} // Verifica si la categoría está seleccionada
          onChange={() => {
            handleFilterChange("categorias", item.name);
          }}
          className="mr-2"
        />
        <label className="text-gray-700">{item.name}</label>
      </li>
    ));
  };

  // Función para manejar el cambio de filtros de las marcas
  const renderMarcasCheckboxes = () => {
    return marcas.map((item) => (
      <li key={item.id} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={item.id}
          value={item.brand}
          checked={filters.marcas.includes(item.brand)}
          onChange={() => handleFilterChange("marcas", item.brand)}
          className="mr-2"
        />
        <label className="text-gray-700">{item.brand}</label>
      </li>
    ));
  };

  // Función para manejar el cambio de filtros de los precios
  const renderPreciosCheckboxes = () => {
    return precios.map((item) => (
      <li key={item.id} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={item.id}
          value={item.range}
          checked={filters.precio.includes(item.range)}
          onChange={() => handleFilterChange("precio", item.range)}
          className="mr-2"
        />
        <label className="text-gray-700">
          {item.range === "200-500"
            ? "S/200 - S/500"
            : `S/${item.range.replace("-", " - S/")}`}
        </label>
      </li>
    ));
  };

  return (
    <aside className="w-auto p-4 ">
      <h2 className="text-xl font-bold text-green-600 mb-4">Filtros</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categorías</h3>
        <ul>{renderCategoriasCheckboxes()}</ul> {/* Renderiza las categorías */}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Marcas</h3>
        <ul>{renderMarcasCheckboxes()}</ul> {/* Renderiza las marcas */}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Precio</h3>
        <ul>{renderPreciosCheckboxes()}</ul> {/* Renderiza los precios */}
      </div>
    </aside>
  );
}

export default Filtros;
