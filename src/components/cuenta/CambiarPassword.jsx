import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CambiarPassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Alternar visibilidad de las contraseñas
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Validar contraseñas
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      setError("La nueva contraseña no puede ser igual a la actual");
      return;
    }

    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("No se pudo verificar al usuario. Por favor, inicia sesión.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/auth/changePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Hubo un error al cambiar la contraseña");
      } else {
        setMessage("Contraseña cambiada exitosamente");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Redirigir tras éxito
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {message && <div className="text-green-500 mb-4">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Contraseña Actual */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña Actual
            </label>
            <div className="relative">
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.currentPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.newPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirmar Nueva Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirmPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default CambiarPassword;
