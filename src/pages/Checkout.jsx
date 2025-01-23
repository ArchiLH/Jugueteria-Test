import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutProgress from "../components/checkout/CheckoutProgreso";
import PersonalDataForm from "../components/checkout/DatosPersonales";
import DeliveryForm from "../components/checkout/FormEntrega";
import OrderSummary from "../components/carrito/ResumenCarrito";
import NavigationButtons from "../components/checkout/BotonesNavegacion";
import BannerCheckout from "../components/checkout/BannerCheckout";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();
  const [productDetails, setProductDetails] = useState([]);
  const {
    step,
    formData,
    errors,
    isLoading,
    handleChange,
    handleNextStep,
    handlePreviousStep,
  } = useCheckout();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Validación para carrito vacío
  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">El carrito está vacío</h2>
        <button
          onClick={() => navigate("/product-catalog")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ir a Catalogo de Productos
        </button>
      </div>
    );
  }

  // Función para obtener los productos del carrito
  const fetchProducts = async () => {
    try {
      const productResponses = await Promise.all(
        cart.map((product) => fetch(`http://localhost:8080/api/productos/${product.id}`))
      );

      const productData = await Promise.all(
        productResponses.map(async (res) => {
          if (res.ok) {
            return await res.json();
          } else {
            throw new Error(`Producto no encontrado: ${res.status}`);
          }
        })
      );

      setProductDetails(productData);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Cargar los productos al iniciar
  }, [cart]);

  // Función para obtener el clientSecret del backend
  const fetchClientSecret = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: subtotal * 100, // Monto en centavos
          productId: cart.map((product) => product.id), // Lista de IDs de los productos
        }),
      });

      // Registrar la respuesta en texto
      const text = await response.text();
      console.log("Respuesta del servidor:", text); // Ver qué se obtiene

      if (response.ok) {
        // Intentar parsear el texto solo si la respuesta es exitosa
        const data = JSON.parse(text);
        setClientSecret(data.clientSecret);
      } else {
        throw new Error(text || "Error al obtener el clientSecret");
      }
    } catch (error) {
      console.error("Error al obtener el clientSecret:", error);
    }
  };

  useEffect(() => {
    if (subtotal > 0) {
      fetchClientSecret(); // Obtener clientSecret cuando hay productos en el carrito
    }
  }, [subtotal]);

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Solo procesamos el pago si todos los pasos son válidos
    if (step === 3) {
      if (!stripe || !elements || !clientSecret) {
        return;
      }

      setIsProcessing(true);

      // Confirmar el pago con Stripe
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        console.error("Error en el pago:", payload.error.message);
        // Mostrar un mensaje de error al usuario si ocurre un fallo
      } else {
        if (payload.paymentIntent.status === "succeeded") {
          navigate("/order-confirmacion");
        }
      }

      setIsProcessing(false);
    } else {
      handleNextStep(); // Avanzar al siguiente paso si no estamos en el paso final
    }
  };

  // Renderizar el contenido de acuerdo con el paso actual
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDataForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <DeliveryForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <div>
            <CardElement />
            <button disabled={isProcessing || !stripe || !elements} type="submit">
              {isProcessing ? "Procesando..." : "Pagar"}
            </button>
          </div>
        );
      default:
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
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
            </form>
          </div>

          <div className="w-full md:w-1/3">
            <OrderSummary
              subtotal={subtotal}
              descuentos={0}
              total={subtotal}
              showCheckoutButton={false} // Para no mostrar el botón de proceder al pago
            />
          </div>
        </div>

        <NavigationButtons
          step={step}
          isLoading={isLoading}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default Checkout;