import { createContext, useContext, useReducer, useEffect } from "react";

// Crear el contexto
const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
  cart: [],
  subtotal: 0,
  totalQuantity: 0,
};

// Reducer para manejar las acciones
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);

      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...action.payload, quantity: 1 }];

      const totalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        cart: updatedCart,
        subtotal: calculateSubtotal(updatedCart),
        totalQuantity,
      };
    }

    case "REMOVE_ITEM": {
      const filteredCart = state.cart.filter((item) => item.id !== action.payload);
      const totalQuantity = filteredCart.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        cart: filteredCart,
        subtotal: calculateSubtotal(filteredCart),
        totalQuantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCartQuantity = state.cart.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const totalQuantity = updatedCartQuantity.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        cart: updatedCartQuantity,
        subtotal: calculateSubtotal(updatedCartQuantity),
        totalQuantity,
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
        subtotal: 0,
        totalQuantity: 0,
      };
    }

    default:
      return state;
  }
}

// Función para calcular el subtotal
const calculateSubtotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Cargar el estado inicial desde localStorage
const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error("Error cargando carrito desde localStorage:", error);
    return initialState;
  }
};

// Proveedor del contexto
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  // Actualizar localStorage cuando cambie el estado
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
      console.error("Error guardando carrito en localStorage:", error);
    }
  }, [state]);

  const value = {
    cart: state.cart,
    subtotal: state.subtotal,
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
export const useCart = () => useContext(CartContext);
