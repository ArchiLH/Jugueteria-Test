const PaymentForm = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Finaliza tu Compra</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="font-semibold mb-4">Método de Pago</h3>

        <div className="space-y-4">
          <div className="flex items-center p-3 border rounded-md bg-white">
            <input
              type="radio"
              id="debito"
              name="metodoPago"
              value="debito"
              checked={formData.metodoPago === "debito"}
              onChange={handleChange}
              className="mr-3 focus:ring-green-500"
            />
            <label htmlFor="debito" className="flex items-center flex-1">
              <span className="text-gray-700 font-medium">
                Tarjeta de Débito
              </span>
              <div className="ml-auto flex space-x-2">
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
              </div>
            </label>
          </div>

          {/* PayPal */}
        <div className="flex items-center p-3 border rounded-md bg-white">
            <input
              type="radio"
              id="paypal"
              name="metodoPago"
              value="paypal"
              checked={formData.metodoPago === "paypal"}
              onChange={handleChange}
              className="mr-3 focus:ring-green-500"
            />
            <label htmlFor="paypal" className="flex items-center flex-1">
              <span className="text-gray-700 font-medium">PayPal</span>
              <div className="ml-auto">
                <img src="/paypal.svg" alt="PayPal" className="h-6" />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Render PayPal Buttons if PayPal is selected */}
      {formData.metodoPago === "paypal" && (
        <PayPalScriptProvider options={{ "client-id": "AfQTM5li-eR22K84cV89UkywMGGwglRx7xZjXR1P DzQQNbL-171MwtrC-NNIADeQVfvXy5qEWxIRphPF"
         
         }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "74.90", // Replace with dynamic total
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert("Transaction completed by " + details.payer.name.given_name);
              });
            }}
          />
        </PayPalScriptProvider>
      )}

      {errors && <p className="text-red-500 text-sm">{errors.metodoPago}</p>}
    </div>
  );
};

export default PaymentForm;
