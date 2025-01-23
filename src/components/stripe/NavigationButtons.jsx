const NavigationButtons = ({ step, isLoading, onPrevious, onNext, onSubmit }) => {
    return (
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={onPrevious}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Anterior
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={onNext}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirmar Pago
          </button>
        )}
      </div>
    );
  };
  
  export default NavigationButtons;
  