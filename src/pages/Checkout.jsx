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
import PaymentForm from "../components/checkout/FormPago";

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
          <PaymentForm // <-- Renderiza PaymentForm AQUÍ
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
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
