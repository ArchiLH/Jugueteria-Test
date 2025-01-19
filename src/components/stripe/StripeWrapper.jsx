import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Cargar Stripe con tu clave pública
const stripePromise = loadStripe("pk_test_51QTBiWGVrTx2ekztCLwpc8YlJZrdvWqNBXV2eqKEAAUNaJjsgCBNkT6aFTHSia74t2G8V1vuEhLYgspETmHMCUTP00Ub5Lk2kr");

const StripePaymentWrapper = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  // Obtener el clientSecret del backend
  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };

    if (amount) {
      fetchClientSecret();
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Pago exitoso!");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Pago</h3>
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="card-element">Detalles de la tarjeta</label>
              <CardElement id="card-element" />
            </div>
            <button
              type="submit"
              disabled={!stripe}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Pagar
            </button>
          </form>
        </Elements>
      )}
    </div>
  );
};

export default StripePaymentWrapper;
