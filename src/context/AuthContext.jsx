import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// funcion para usar el contexto de autenticacion en cualquier componente que lo necesite sin tener que pasar props manualmente a traves de la jerarquia de componentes 
export function AuthProvider({ children }) {
  // Estado para almacenar la informacion del usuario autenticado 
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user"); // Obtener el usuario almacenado en localStorage
      return savedUser ? JSON.parse(savedUser) : null;  // Devolver el usuario almacenado o null si no hay ninguno
    } catch (error) {
      console.error(
        "Error accessing localStorage during initialization:",
        error,
      );
      return null;
    }
  });

  // Funcion para iniciar sesion y almacenar la informacion del usuario en el estado y en localStorage 
  const login = (userData) => {
    try {
      setUser(userData);
      // Guardar en localStorage para persistencia
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  // Funcion para cerrar sesion y eliminar la informacion del usuario del estado y de localStorage
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const autenticacionUsuario = () => useContext(AuthContext);
