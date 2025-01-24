const NavigationButtons = ({
  step,
  isLoading,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="mt-8 flex justify-between">
      {step > 1 && (
        <button
          onClick={onPrevious}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200
                   transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500
                   focus:ring-offset-2"
          disabled={isLoading}
        >
          ← Volver Atrás
        </button>
      )}

      {step < 3 && (
        <button
          onClick={onNext}
          className="ml-auto bg-green-500 text-white px-4 py-2 rounded-md
                           hover:bg-green-600 transition-colors focus:outline-none
                           focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {step === 1 ? "Ir a Entrega →" : "Ir a Pago →"}
        </button>
        //   <button
        //     onClick={onNext}
        //     className="ml-auto bg-green-500 text-white px-4 py-2 rounded-md
        //              hover:bg-green-600 transition-colors focus:outline-none
        //              focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        //     disabled={isLoading}
        //   >
        //     {step === 1 ? "Ir a Entrega →" : "Ir a Pago →"}
        //   </button>
        // ) : (
        //   <button
        //     onClick={onSubmit}
        //     className="ml-auto bg-green-500 text-white px-6 py-2 rounded-md
        //              hover:bg-green-600 transition-colors focus:outline-none
        //              focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        //              disabled:bg-green-300"
        //     disabled={isLoading}
        //   >
        //     {isLoading ? (
        //       <div className="flex items-center">
        //         <span className="mr-2">Procesando</span>
        //         <div
        //           className="animate-spin h-4 w-4 border-2 border-white
        //                      border-t-transparent rounded-full"
        //         />
        //       </div>
        //     ) : (
        //       "Pagar Ahora →"
        //     )}
        //   </button>
      )}
    </div>
  );
};

export default NavigationButtons;
