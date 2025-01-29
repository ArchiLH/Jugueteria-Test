import { brands } from "../../data/marcas";
function BrandSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Marcas</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Mapeo de las marcas para mostrar su imagen y nombre */} 
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="w-16 md:w-24 hover:opacity-75 transition-opacity"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-auto object-contain max-h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
