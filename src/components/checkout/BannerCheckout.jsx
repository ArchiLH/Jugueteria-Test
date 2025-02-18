import { CiLock } from "react-icons/ci";

const PaymentBanner = () => {
  return (
    <div className="rounded-lg m-8">
      <div className=" mx-auto">
        {/* Título y subtítulo */}
        <div className="flex justify-center mb-4">
          <CiLock className="text-4xl text-gray-800" />
        </div>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Pago Seguro y Confiable
          </h2>
          <p className="text-gray-600 text-sm">
            Todas nuestras transacciones están protegidas
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentBanner;
