import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

// Crear el contexto
const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
  cart: [],
  subtotal: 0,
  totalQuantity: 0,
};

// Función para calcular el subtotal
const calculateSubtotal = (cart) => {
  // return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );
};

// Función para calcular la cantidad total de items
const calculateTotalQuantity = (cart) => {
  // return cart.reduce((total, item) => total + item.quantity, 0);
  return cart.reduce((total, item) => total + (item.quantity || 0), 0);
};

// Función para manejar las acciones del carrito
function cartReducer(state, action) {
  // switch para manejar las acciones del carrito
  switch (action.type) {
    // caso para agregar un item al carrito
    case "ADD_ITEM": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      // Verificar stock disponible
      const stockDisponible = action.payload.stock;
      const cantidadActual = existingItem ? existingItem.quantity : 0;

      if (cantidadActual >= stockDisponible) {
        toast.warning("Has alcanzado el límite de stock disponible");
        return state;
      }

      let productToAdd = action.payload; // Producto a agregar inicialmente es el payload

      // Calcular precio con descuento si es de la categoría "Ofertas"
      if (action.payload.categoria === "Ofertas") {
        const discountedPrice = action.payload.price * 0.8; // 20% de descuento
        // Crear un nuevo objeto producto con el precio descontado
        productToAdd = { ...action.payload, price: discountedPrice };
      }

      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart, { ...productToAdd, quantity: 1 }];

      return updateCartState(updatedCart);
    }

    // caso para eliminar un item del carrito
    case "REMOVE_ITEM": {
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload,
      );

      return updateCartState(filteredCart);
    }

    // caso para actualizar la cantidad de un item en el carrito
    case "UPDATE_QUANTITY": {
      const { itemId, quantity } = action.payload;
      const updatedCart = state.cart.map((item) =>
        // item.id === itemId ? { ...item, quantity } : item,
        item.id === itemId
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item,
      );

      return updateCartState(updatedCart);
    }

    // caso para vaciar el carrito cuando se completa la compra
    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

// Función auxiliar para actualizar el estado del carrito
const updateCartState = (cart) => {
  // const subtotal = calculateSubtotal(cart);
  return {
    cart,
    // subtotal: Number.isFinite(subtotal) ? subtotal : 0,
    subtotal: calculateSubtotal(cart),
    totalQuantity: calculateTotalQuantity(cart),
  };
};

const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem("cart");

    // Si no hay nada en localStorage, devuelve el estado inicial
    if (!savedCart) {
      return initialState;
    }

    // Intenta parsear el JSON
    const parsedCart = JSON.parse(savedCart);

    // Verifica que parsedCart sea un array
    if (Array.isArray(parsedCart)) {
      return {
        cart: parsedCart,
        subtotal: calculateSubtotal(parsedCart), // Calcula el subtotal
        totalQuantity: calculateTotalQuantity(parsedCart), // Calcula la cantidad total
      };
    }

    // Si no es un array, devuelve el estado inicial
    return initialState;
  } catch (error) {
    console.error("Error cargando carrito desde localStorage:", error);
    return initialState; // Devuelve el estado inicial en caso de error
  }
};

// Proveedor del contexto
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  // Actualizar localStorage cuando cambie el estado
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch (error) {
      console.error("Error guardando carrito en localStorage:", error);
    }
  }, [state.cart]);

  const value = {
    cart: state.cart,
    subtotal: state.subtotal || 0,
    totalQuantity: state.totalQuantity,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (itemId) => dispatch({ type: "REMOVE_ITEM", payload: itemId }),
    updateQuantity: (itemId, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para consumir el contexto
// export const useCart = () => useContext(CartContext);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
