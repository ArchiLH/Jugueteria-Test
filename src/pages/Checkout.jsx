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

function Checkout() {
  const navigate = useNavigate();
  const { cart, updateProductQuantity } = useCart();
  const {
    step,
    formData,
    errors,
    isLoading,
    handleChange,
    handleNextStep,
    handlePreviousStep,
  } = useCheckout();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Recalcular Subtotal y Total cuando el carrito cambie
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/product-catalog");
    } else {
      const calculatedSubtotal = cart.reduce((acc, item) => {
        const cantidad = item.cantidad || 1; // Aseguramos que la cantidad no sea nula
        console.log(`Producto: ${item.name}, Precio unitario: ${item.price}, Cantidad: ${cantidad}`);
        return acc + (item.price || 0) * cantidad;
      }, 0);
      setSubtotal(calculatedSubtotal);

      const calculatedTotal = calculatedSubtotal; // Si tienes descuentos, ajusta aquí
      console.log("Subtotal calculado:", calculatedSubtotal);
      console.log("Total calculado:", calculatedTotal);
      setTotal(calculatedTotal);
    }
  }, [cart, navigate]);

  // Asegurarnos de que cuando se actualice la cantidad en el carrito, se refleje correctamente
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateProductQuantity(productId, newQuantity);  // Actualiza la cantidad en el carrito
    }
  };

  const handleStripeRedirect = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Inicia sesión para proceder al pago");
        return;
      }

      const products = cart.map((item) => ({
        stripePriceId: item.stripe_price_id,
        quantity: item.cantidad || 1,
      }));

      const response = await fetch(
        "http://localhost:8080/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error al crear la sesión: ${errorData.error || "Desconocido"}`);
        return;
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error al iniciar el proceso de pago:", error);
      alert("Hubo un problema al procesar el pago. Inténtalo de nuevo.");
    }
  };

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
          <div className="space-y-6">
            <h2 className="text-xl text-center font-semibold mb-4">
              Finalizar Compra
            </h2>
            <button
              onClick={handleStripeRedirect}
              className={`w-full py-3 px-4 rounded-md text-white font-medium text-lg transition-colors duration-200
                        bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                        shadow-sm hover:shadow-md
                        flex justify-center items-center gap-2`}
            >
              Ir a Stripe para pagar S/. {total.toFixed(2)}
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
            {renderStepContent()}
          </div>

          <div className="w-full md:w-1/3">
            <OrderSummary
              subtotal={subtotal}
              descuentos={0} // Asegúrate de que esta lógica esté bien si agregas descuentos
              total={total}
              showCheckoutButton={false}
              handleQuantityChange={handleQuantityChange} // Pasa la función de cambio de cantidad
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
