// import { useState } from "react";
import { usePasswordForm } from "../../hooks/useChangePass";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordService } from "../../api/passwordService";
import { Input } from "../ui/Input";
import { validatePassword } from "../../utils/validadores";

const CambiarPassword = () => {
  const navigate = useNavigate();
  // const [passwordData, setPasswordData] = useState({
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // });
  const { passwordData, errors, handleChange, validateForm, resetForm } =
    usePasswordForm();
  // const [errors, setErrors] = useState({});

  // Manejar cambios en los campos del formulario
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   setErrors((prev) => ({ ...prev, [name]: "" }));
  // };

  // const validateForm = () => {
  //   const newErrors = {};

  //   // Validación contraseña actual
  //   if (!passwordData.currentPassword) {
  //     newErrors.currentPassword = errorMessages.password.required;
  //   }

  //   // Validación nueva contraseña
  //   if (!passwordData.newPassword) {
  //     newErrors.newPassword = errorMessages.password.required;
  //   } else if (!validatePassword(passwordData.newPassword)) {
  //     newErrors.newPassword = errorMessages.password.invalid;
  //   }

  //   // Validación confirmar contraseña
  //   if (!passwordData.confirmPassword) {
  //     newErrors.confirmPassword = "Debe confirmar la nueva contraseña";
  //   } else if (passwordData.newPassword !== passwordData.confirmPassword) {
  //     newErrors.confirmPassword = "Las contraseñas no coinciden";
  //   }

  //   // Validación contraseñas diferentes
  //   if (passwordData.currentPassword === passwordData.newPassword) {
  //     newErrors.newPassword =
  //       "La nueva contraseña no puede ser igual a la actual";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const toastId = toast.loading("Cambiando contraseña...");

    try {
      const userId = localStorage.getItem("id");
      await passwordService.changePassword(userId, passwordData);

      toast.update(toastId, {
        render: "¡Contraseña actualizada exitosamente!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      resetForm();
      setTimeout(() => navigate("/mi-cuenta"), 2000);
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Error de conexión. Intente nuevamente.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // Mostrar requisitos de contraseña
  const renderPasswordRequirements = () => {
    if (!passwordData.newPassword) return null;

    const missingRequirements = validatePassword.getMissingRequirements(
      passwordData.newPassword,
    );

    return (
      <div className="text-sm text-gray-600 mt-2">
        <p>Requisitos de contraseña:</p>
        <ul className="list-disc pl-5">
          {[
            "Mínimo 8 caracteres",
            "Una letra mayúscula",
            "Una letra minúscula",
            "Un número",
          ].map((req) => (
            <li
              key={req}
              className={
                missingRequirements.includes(req)
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {req}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Contraseña Actual"
          name="currentPassword"
          type="password"
          value={passwordData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          required
        />

        <Input
          label="Nueva Contraseña"
          name="newPassword"
          type="password"
          value={passwordData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
          placeholder="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
        />

        <Input
          label="Confirmar Nueva Contraseña"
          name="confirmPassword"
          type="password"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          placeholder="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
        />
        {renderPasswordRequirements()}
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
