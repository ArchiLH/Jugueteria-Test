import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutProgress from "../components/checkout/CheckoutProgreso";
import PersonalDataForm from "../components/checkout/DatosPersonales";
import DeliveryForm from "../components/checkout/FormEntrega";
import OrderSummary from "../components/carrito/ResumenCarrito";
import NavigationButtons from "../components/checkout/BotonesNavegacion";
import BannerCheckout from "../components/checkout/BannerCheckout";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

function Checkout() {
  const navigate = useNavigate();
  const { cart, updateProductQuantity, subtotal } = useCart();
  const {
    step,
    formData,
    errors,
    isLoading,
    handleChange,
    handleNextStep,
    handlePreviousStep,
  } = useCheckout();

  useEffect(() => {
    console.log("Verificando carrito:", cart);
    if (!cart || cart.length === 0) {
      console.log("Carrito vacío, redirigiendo a catálogo de productos.");
      navigate("/product-catalog");
    }
  }, [cart, navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    console.log("Cambiando cantidad del producto", productId, "a", newQuantity);
    if (newQuantity > 0) {
      updateProductQuantity(productId, newQuantity); // Actualiza la cantidad en el carrito
    } else {
      alert("La cantidad debe ser al menos 1.");
    }
  };

  const handleStripeRedirect = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Token encontrado:", token);

      if (!token) {
        console.log("Token no encontrado. Redirigiendo al inicio de sesión...");
        alert("Inicia sesión para proceder al pago");
        return;
      }

      const products = cart.map((item) => ({
        stripePriceId: item.stripe_price_id,
        quantity: item.quantity > 0 ? item.quantity : 1, // Asegura mínimo 1
      }));

      console.log("Productos que se enviarán a la API de Stripe:", products);

      const response = await fetch("http://localhost:8080/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: products }),
      });

      console.log("Respuesta de la API de Stripe:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Cuerpo de error:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          console.error("Error de la API de Stripe:", errorData.error);
          alert(`Error al crear la sesión: ${errorData.error || "Desconocido"}`);
        } catch {
          console.error("Error desconocido de la API de Stripe:", errorText);
          alert("Error desconocido al crear la sesión.");
        }
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
    }
  };

  const handlePayPalRedirect = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Token encontrado:", token);

      if (!token) {
        console.log("Token no encontrado. Redirigiendo al inicio de sesión...");
        alert("Inicia sesión para proceder al pago");
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
    }
  };

  const renderStepContent = () => {
    console.log("Renderizando paso:", step);
    switch (step) {
      case 1:
        console.log("Paso 1: Datos personales");
        return (
          <PersonalDataForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        console.log("Paso 2: Formulario de entrega");
        return (
          <DeliveryForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        console.log("Paso 3: Finalizar compra");
        return (
          <div className="space-y-6">
            <h2 className="text-xl text-center font-semibold mb-4">Finalizar Compra</h2>
            <button
              onClick={handleStripeRedirect}
              className={`w-full py-3 px-4 rounded-md text-white font-medium text-lg transition-colors duration-200
                        bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                        shadow-sm hover:shadow-md
                        flex justify-center items-center gap-2`}
            >
              Ir a Stripe para pagar S/. {subtotal.toFixed(2)}
            </button>

            <button
              onClick={handlePayPalRedirect}
              className={`w-full py-3 px-4 rounded-md text-white font-medium text-lg transition-colors duration-200
              bg-orange-500 hover:bg-orange-600 active:bg-orange-700
              shadow-sm hover:shadow-md
              flex justify-center items-center gap-2`}
            >
              Ir a PayPal para pagar S/. {subtotal.toFixed(2)}
            </button>
          </div>
        );
      default:
        console.log("Paso desconocido:", step);
        return null;
    }
  };

  return (
    <>
      <BannerCheckout />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CheckoutProgress pasoActual={step} />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
            {renderStepContent()}
          </div>

          <div className="w-full md:w-1/3">
            <OrderSummary
              subtotal={subtotal}
              descuentos={0}
              total={subtotal}
              showCheckoutButton={false}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
        </div>

        <NavigationButtons
          step={step}
          isLoading={isLoading}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      </div>
    </>
  );
}

export default Checkout;
