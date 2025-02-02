import { useState } from "react";
import { validatePassword, errorMessages } from "../utils/validadores";

export const usePasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Validar contraseña actual
    if (!currentPassword) {
      newErrors.currentPassword = errorMessages.passwordChange.currentRequired;
    }

    // Validar nueva contraseña
    if (!newPassword) {
      newErrors.newPassword = errorMessages.passwordChange.newRequired;
    } else {
      if (!validatePassword.hasMinLength(newPassword)) {
        newErrors.newPassword =
          errorMessages.passwordChange.requirements.minLength;
      }
      if (!validatePassword.hasUpperCase(newPassword)) {
        newErrors.newPassword =
          errorMessages.passwordChange.requirements.uppercase;
      }
      if (!validatePassword.hasLowerCase(newPassword)) {
        newErrors.newPassword =
          errorMessages.passwordChange.requirements.lowercase;
      }
      if (!validatePassword.hasNumber(newPassword)) {
        newErrors.newPassword =
          errorMessages.passwordChange.requirements.number;
      }
    }

    // Validar confirmación
    if (!confirmPassword) {
      newErrors.confirmPassword = errorMessages.passwordChange.confirmRequired;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword =
        errorMessages.passwordChange.passwordsMismatch;
    }

    // Validar que la nueva contraseña sea diferente de la actual
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = errorMessages.passwordChange.sameAsOld;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo modificado
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const resetForm = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return {
    passwordData,
    errors,
    handleChange,
    validateForm,
    resetForm,
  };
};
