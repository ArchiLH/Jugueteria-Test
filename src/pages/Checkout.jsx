import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutProgress from "../components/checkout/CheckoutProgreso";
import PersonalDataForm from "../components/checkout/DatosPersonales";
import DeliveryForm from "../components/checkout/FormEntrega";
import StripeWrapper from "../components/stripe/StripeWrapper";
import OrderSummary from "../components/carrito/ResumenCarrito";
import NavigationButtons from "../components/checkout/BotonesNavegacion";
import BannerCheckout from "../components/checkout/BannerCheckout";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();
  const {
    step,
    formData,
    errors,
    isLoading,
    handleChange,
    handleNextStep,
    handlePreviousStep,
    processPayment,
  } = useCheckout();

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

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Solo procesamos el pago si todos los pasos son válidos
    if (step === 3) {
      try {
        if (await processPayment()) {
          navigate("/order-confirmacion");
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        // Mostrar mensaje de error al usuario si ocurre un fallo
      }
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
          <StripeWrapper
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
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
