import { CartProvider } from "./CartContext";
import { FavoritosProvider } from "./FavoritosContext";
import { CheckoutProvider } from "./CheckoutContext";

export function AppProviders({ children }) {
  return (
    
    <CartProvider>
      <FavoritosProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </FavoritosProvider>
    </CartProvider>
  );
}
