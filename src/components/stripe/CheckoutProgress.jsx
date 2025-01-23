const CheckoutProgress = ({ pasoActual }) => {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div className={`step ${pasoActual >= 1 ? "active" : ""}`}>Paso 1: Datos Personales</div>
          <div className={`step ${pasoActual >= 2 ? "active" : ""}`}>Paso 2: Entrega</div>
          <div className={`step ${pasoActual >= 3 ? "active" : ""}`}>Paso 3: Pago</div>
        </div>
      </div>
    );
  };
  
  export default CheckoutProgress;
  