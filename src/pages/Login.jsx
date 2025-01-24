import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { autenticacionUsuario } from "../context/AuthContext";
import { loginUser } from "../api/Autenticacion";
import { Input } from "../components/ui/Input";
import { toast } from "react-toastify";

// Componente principal de login
function Login() {
  const navigate = useNavigate();
  const { login } = autenticacionUsuario();
  const [formData, setFormData] = useState({ username: "", password: "" }); // Mantener 'username'
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError(""); // Limpiar error cuando el usuario empiece a escribir
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      toast.success("¡Inicio de sesión exitoso!", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    }

    try {
      const userData = await loginUser(formData); // Llamada al API para obtener los datos del usuario
      if (!userData.token)
        throw new Error("No se recibió el token de autenticación");

      // Almacenar el token, username y userId en el localStorage
      if (userData.token) {
        localStorage.setItem("token", userData.token); // Almacenar el token
        localStorage.setItem("username", userData.username); // Almacenar el username
        localStorage.setItem("userId", userData.userId); // Almacenar el userId
      }

      // Llamada a la función login para manejar el estado global (contexto)
      login({
        token: userData.token,
        username: userData.username,
        userId: userData.userId, // Añadimos el userId al estado global
      });

      navigate("/"); // Redirigir a la página principal después de login exitoso
    } catch (error) {
      console.error("Error en login:", error);
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Iniciar sesión
        </h2>

        <div className="bg-white rounded-lg shadow px-6 py-8 sm:px-8">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Nombre de Usuario:"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu nombre de usuario"
              required
              error={error && error.includes("usuario") ? error : ""}
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
              error={error && error.includes("contraseña") ? error : ""}
            />

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Iniciar Sesion
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/registro"
                className="text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                Regístrate
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
