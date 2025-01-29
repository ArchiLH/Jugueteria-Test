import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
          {/* Columna EMPRESA */}
          <div className="flex flex-col items-center text-center">
            <h3 className=" font-semibold mb-4 uppercase">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Nuestras Tiendas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contactos
                </a>
              </li>
            </ul>
          </div>

          {/* Columna NECESITAS AYUDA */}
          <div className="flex flex-col items-center text-center">
            <h3 className=" font-semibold mb-4 uppercase">Necesitas ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Políticas de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Políticas de Despacho
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Libro de Reclamaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna REDES SOCIALES */}
          <div className="flex flex-col items-center text-center">
            <h3 className=" font-semibold mb-4 uppercase">Síguenos</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <FaFacebook className=" mr-2" />
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <FaInstagram className=" mr-2" />
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <FaTwitter className=" mr-2" />
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright y créditos */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2024 Mundo Mágico. Todos los derechos reservados</p>
          <p className="mt-2 md:mt-0">Desarrollado por Suicide Squa</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
