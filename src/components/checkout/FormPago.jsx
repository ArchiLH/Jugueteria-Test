//import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../../context/CartContext"; // Import useCart in FormPago
//import { useNavigate } from "react-router-dom"; // Import useNavigate in FormPago
import { FaStripeS } from "react-icons/fa";
import { BsPaypal } from "react-icons/bs";
import { useState } from "react";

const PaymentForm = ({ formData, handleChange, errors }) => {
  const { cart, subtotal } = useCart(); // Use CartContext in FormPago
  //const navigate = useNavigate(); // Use useNavigate in FormPago
  const [isLoadingStripe, setIsLoadingStripe] = useState(false); // Estado de carga para Stripe
  const [isLoadingPayPal, setIsLoadingPayPal] = useState(false); // Estado de carga para PayPal

  const handleStripeRedirect = async () => {
    setIsLoadingStripe(true);
    try {
      const token = localStorage.getItem("token");

      console.log("Token encontrado:", token);

      if (!token) {
        console.log("Token no encontrado. Redirigiendo al inicio de sesión...");
        alert("Inicia sesión para proceder al pago");
        //setIsLoadingStripe(false);
        return;
      }

      const products = cart.map((item) => ({
        stripePriceId: item.stripe_price_id,
        quantity: item.quantity > 0 ? item.quantity : 1, // Asegura mínimo 1
      }));

      console.log("Productos que se enviarán a la API de Stripe:", products);

      const response = await fetch(
        "http://localhost:8080/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products: products }),
        },
      );

      console.log("Respuesta de la API de Stripe:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Cuerpo de error:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          console.error("Error de la API de Stripe:", errorData.error);
          alert(
            `Error al crear la sesión: ${errorData.error || "Desconocido"}`,
          );
        } catch {
          console.error("Error desconocido de la API de Stripe:", errorText);
          alert("Error desconocido al crear la sesión.");
        }
        //setIsLoadingStripe(false);
        return;
      }

      const { url } = await response.json();
      if (url) {
        console.log("Redirigiendo a Stripe con URL:", url);
        window.location.href = url;
      } else {
        alert("Error al obtener la URL de Stripe.");
      }
    } catch (error) {
      console.error("Error al iniciar el proceso de pago:", error);
      alert("Hubo un problema al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setIsLoadingStripe(false); // Detiene la carga después de intentar la redirección (éxito o error)
    }
  };

  const handlePayPalRedirect = async () => {
    setIsLoadingPayPal(true);
    try {
      const token = localStorage.getItem("token");

      console.log("Token encontrado:", token);

      if (!token) {
        console.log("Token no encontrado. Redirigiendo al inicio de sesión...");
        alert("Inicia sesión para proceder al pago");
        //setIsLoadingPayPal(false);
        return;
      }

      const products = cart.map((item) => ({
        productId: item.id, // Aquí usamos el ID del producto
        quantity: item.quantity > 0 ? item.quantity : 1, // Asegura mínimo 1
      }));

      console.log("Productos que se enviarán a la API de PayPal:", products);

      const response = await fetch("http://localhost:8080/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(products),
      });

      console.log("Respuesta de la API de PayPal:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Cuerpo de error:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          console.error("Error de la API de PayPal:", errorData.error);
          alert(`Error al crear el pago: ${errorData.error || "Desconocido"}`);
        } catch {
          console.error("Error desconocido de la API de PayPal:", errorText);
          alert("Error desconocido al crear el pago.");
        }
        //setIsLoadingPayPal(false);
        return;
      }

      const { url } = await response.json();
      if (url) {
        console.log("Redirigiendo a PayPal con URL:", url);
        window.location.href = url;
      } else {
        alert("Error al obtener la URL de PayPal.");
      }
    } catch (error) {
      console.error("Error al iniciar el proceso de pago con PayPal:", error);
      alert("Hubo un problema al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setIsLoadingPayPal(false); // Detiene la carga después de intentar la redirección (éxito o error)
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Metodo de Pago:</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        {/* <h3 className="font-semibold mb-4">Método de Pago:</h3> */}

        <div className="space-y-4">
          {/* Botones de Pago - Añadido AQUÍ */}
          <div className="mt-3 space-y-4">
            <button
              onClick={handleStripeRedirect}
              disabled={isLoadingStripe}
              className={`w-full py-3  rounded-md text-white font-bold text-sm transition-colors duration-200
                              bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                              shadow-sm hover:shadow-md
                              flex justify-center items-center gap-2`}
            >
              {isLoadingStripe ? (
                "Cargando..."
              ) : (
                <>
                  Pagar con Stripe {/* S/. {subtotal.toFixed(2)}  */}
                  <FaStripeS />
                </>
              )}
            </button>

            <button
              onClick={handlePayPalRedirect}
              disabled={isLoadingPayPal}
              className={`w-full py-3 px-4 rounded-md text-white font-bold text-sm transition-colors duration-200
                              bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                              shadow-sm hover:shadow-md
                              flex justify-center items-center gap-2`}
            >
              {isLoadingPayPal ? ( // Texto condicional basado en isLoading
                "Cargando..."
              ) : (
                <>
                  Pagar con PayPal {/* S/. {subtotal.toFixed(2)}  */}
                  <BsPaypal />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
