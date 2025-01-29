import { useNavigate } from "react-router-dom";
import { autenticacionUsuario } from "../../context/AuthContext";
import { toast } from "react-toastify";

function BotonCheckout() {
  const navigate = useNavigate();
  const { user } = autenticacionUsuario();

  // Función para manejar el clic en el botón de checkout y redirigir al usuario a la página de checkout o al login si no está autenticado
  const handleCheckoutClick = () => {
    if (!user) {
      toast.error("Necesitas Iniciar Sesion para realizar la compra", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <button
      onClick={handleCheckoutClick}
      className="w-full text-center bg-green-500 text-white font-semibold py-2 px-4 rounded mt-4
                 hover:bg-green-600 transition-colors"
    >
      Proceder al pago
    </button>
  );
}

export default BotonCheckout;
