import { autenticacionUsuario } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Salir() {
  const navigate = useNavigate();
  const { logout } = autenticacionUsuario();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Cerrando sesión...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular delay
      await logout();

      // Actualizar toast a éxito
      toast.update(toastId, {
        render: "¡Sesión cerrada exitosamente!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Actualizar toast a error
      toast.update(toastId, {
        render: "Error al cerrar sesión",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <img
            src="cerrar-sesion2.png"
            alt="Cerrar sesión"
            className="w-24 h-24 mx-auto mb-4"
          />
          <p className="text-gray-600 mb-4">
            ¿Estás seguro que deseas cerrar tu sesión?
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar Sesión
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Salir;
