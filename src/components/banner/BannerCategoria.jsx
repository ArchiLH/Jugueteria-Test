// funciona para mostrar el banner de la categoria tiene parametros de entrada url_imagen y nombreCategoria que son los datos de la categoria que se quiere mostrar en el banner
function BannerCategoria({ url_imagen, nombreCategoria }) {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={url_imagen}
        alt="Banner de Categoría"
        className="w-full h-52 object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-green-400 text-white text-center py-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">{nombreCategoria}</h2>
      </div>
    </div>
  );
}

export default BannerCategoria;
