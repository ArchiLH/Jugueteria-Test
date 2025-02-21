import { useState } from "react";

const DeliveryForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded); // Funcion para invertir el estado (expandir/colapsar)
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Metodo de Entrega:</h2>
      <div className=" p-6 rounded-lg bg-gray-100">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-green-600 ">
            Retiro en Tienda
          </h3>
          <div className="border-green-500">
            <p className="text-gray-700 mb-3 ">
              Por el momento solo contamos con la modalidad de retiro en tienda.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className=" p-4 rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">
              Información importante:
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span>Dirección: Jr. Puno 928, Lima</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📅</span>
                <span>
                  Horario de atención: Lunes a Sabado de 9:00 am a 10:00 pm
                </span>
              </li>
            </ul>
          </div>

          <div className=" rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">
              ¿Necesitas envío a domicilio?
            </h4>
            <p className="text-gray-600">
              Contáctanos al <span className="font-semibold">987654321</span>{" "}
              para coordinar el envío de tu producto (servicio adicional).
            </p>
          </div>

          <button
            onClick={handleToggleExpand}
            className="flex text-green-500 font-bold hover:text-green-700 focus:outline-none"
          >
            {isExpanded ? "Ocultar Mapa 🡩" : "Mostrar Mapa  🡫"}
          </button>

          {/* Contenido detallado que muestra/oculta */}
          {isExpanded && (
            <div className="mt-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1950.9156637294132!2d-77.02671310160528!3d-12.0551238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8bbaeef7ca5%3A0xcf9cc79d91d8283a!2sEl%20Mundo%20M%C3%A1gico%20de%20Los%20Juguetes!5e0!3m2!1ses-419!2spe!4v1736615004949!5m2!1ses-419!2spe"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              {/* <p className="text-sm text-gray-500 mt-2">
                Nos encontramos a 2 cuadras de la Plaza Mayor de Lima
              </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
