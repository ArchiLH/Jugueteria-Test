import React from 'react';

function Filtros({ filters, handleFilterChange }) {
  const categorias = [
    { id: 1, name: 'Juegos de Mesa' },
    { id: 2, name: 'Juguetes Deportivos' },
    { id: 3, name: 'Figuras de Accion' },
    { id: 4, name: 'Muñecas' },
    { id: 5, name: 'Vehiculos' },
    { id: 6, name: 'Juguetes Educativos' },
  ];
  
  const marcas = [
    { id: 1, name: 'Mattel' },
    { id: 2, name: 'Hasbro' },
    { id: 3, name: 'Hot Wheels' },
    { id: 4, name: 'Marvel' },
    { id: 5, name: 'Barbie' },
    { id: 6, name: 'Lego' },
  ];
  
  const precios = [
    { id: 1, range: '0-50' },
    { id: 2, range: '50-100' },
    { id: 3, range: '100-200' },
    { id: 4, range: '200-500' },
  ];

  const renderCheckboxes = (list, filterType) => {
    return list.map(item => (
      <li key={item.id} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={item.id}
          value={item.name || item.range}
          checked={filters[filterType].includes(item.name || item.range)}
          onChange={() => handleFilterChange(filterType, item.name || item.range)}
          className="mr-2"
        />
        <label htmlFor={item.id} className="text-gray-700">
          {filterType === 'precio'
            ? item.range === '200-500'
              ? 'S/200 - S/500'
              : `S/${item.range.replace('-', ' - S/')}`
            : item.name}
        </label>
      </li>
    ));
  };

  return (
    <aside className="w-1/4 p-4">
      <h2 className="text-xl font-bold text-green-600 mb-4">Filtros</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categorías</h3>
        <ul>
          {renderCheckboxes(categorias, 'categorias')}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Marcas</h3>
        <ul>
          {renderCheckboxes(marcas, 'marcas')}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Precio</h3>
        <ul>
          {renderCheckboxes(precios, 'precio')}
        </ul>
      </div>
    </aside>
  );
}

export default Filtros;
