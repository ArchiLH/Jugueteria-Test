import { useState, useCallback } from "react";
import { validateEmail, validatePhone, validateDNI } from "../utils/validadores";

export const useCheckout = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    lastname: "",
    dni: "",
    phone: "",
    metodoEntrega: "tienda",
    metodoPago: "debito",
  });

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.username?.trim()) {
      newErrors.username = "El nombre es obligatorio";
    }
    if (!formData.lastname?.trim()) {
      newErrors.lastname = "El apellido es obligatorio";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Teléfono inválido - debe tener 9 dígitos";
    }
    if (!formData.dni?.trim()) {
      newErrors.dni = "El DNI es obligatorio";
    } else if (!validateDNI(formData.dni)) {
      newErrors.dni = "DNI inválido - debe tener 8 dígitos";
    }
    return newErrors;
  };

  const validateStep = (stepNumber) => {
    let newErrors = {};
    switch (stepNumber) {
      case 1:
        newErrors = validateStep1();
        break;
      // Agrega más casos si hay más pasos
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Validación en tiempo real
    if (name === "email" && value.trim() && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Email inválido" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, []);

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const processPayment = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      setErrors({ payment: error.message });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/obtenerUsuarioPorId/${userId}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const userData = await response.json();
      setFormData({
        username: userData.username || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        dni: userData.dni || "",
      });
      setIsLoading(false);
    } catch (error) {
      setErrors({ fetchData: error.message });
      console.error("Error en fetchData:", error.message);
      setIsLoading(false);
    }
  };

  return {
    step,
    formData,
    errors,
    isLoading,
    handleChange,
    handleNextStep,
    handlePreviousStep,
    processPayment,
    fetchData,
  };
};