// import { useContext } from "react";
// import { CartContext } from "../context/CartContext"; // Importa el contexto

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart debe ser usado dentro de un CartProvider");
//   }
//   return context;
// };

/* 
    Para utilizar este hook en CartContext eliminas el hook useCart Local y exportas 
    export {CartContext}:
    Ademas se tiene que actualizar todos las rutas de los componentes que utilizan el useCart de CartContext 
    
*/