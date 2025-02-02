import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/Registro";
import { toast } from "react-toastify";

function Registro() {
  const navigate = useNavigate();
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    email: "",
    password: "",
  });

  // Estado para los errores
  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validar el formulario
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username.trim()) {
      tempErrors.username = "El nombre es requerido";
    }
    if (!formData.lastname.trim()) {
      tempErrors.lastname = "El apellido es requerido";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email inválido";
    }
    if (!formData.password) {
      tempErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      tempErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const data = await registerUser(formData);
        const receivedToken = data.token;
        localStorage.setItem("authToken", receivedToken);

        //Mostrar mensaje de éxito solo si el registro fue exitoso
        toast.success("¡Registro exitoso!", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: false,
        });

        //setSuccessMessage("Registro exitoso. ¡Bienvenido!");
        console.log("Token recibido:", receivedToken);

        // Limpiar el formulario
        setFormData({
          username: "",
          lastname: "",
          email: "",
          password: "",
        });

        // Redireccionar a la pagina de login
        navigate("/login")

      } catch (error) {
        setErrorMessage("Error al conectar con la API");
        console.error("Error al conectar con la API:", error);
      }
    }
  };

  return (
    // Contenedor principal con flex y min-height para centrado vertical
    <div className=" flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      {/* Contenedor del formulario con ancho máximo responsivo */}
      <div className="w-full max-w-md space-y-8">
        {/* Encabezado */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Crear cuenta
          </h2>
        </div>

        {/* Contenedor del formulario con fondo blanco */}
        <div className="bg-white rounded-lg shadow px-6 py-8 sm:px-8">
          

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre:
              </label>
              <div className="mt-1">
                <input
                  placeholder="ingresa tu nombre"
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido:
              </label>
              <div className="mt-1">
                <input
                  placeholder="ingresa tu apellido"
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.lastname ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.lastname && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico:
              </label>
              <div className="mt-1">
                <input
                  placeholder="ingresa tu correo"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña:
              </label>
              <div className="mt-1">
                <input
                  placeholder="crea tu contraseña"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Registrarse
              </button>
            </div>
          </form>

          {/* Enlace para iniciar sesión */}
          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                  >
                    Iniciar sesión
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
