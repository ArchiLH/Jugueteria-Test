export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^\d{9}$/.test(phone);
};

export const validateDNI = (dni) => {
  return /^\d{8}$/.test(dni);
};

export const errorMessages = {
  username: {
    required: "El nombre de usuario es requerido",
    invalid:
      "El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones",
    format: "Formato de usuario inválido",
  },
  password: {
    required: "La contraseña es requerida",
    invalid:
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
    format: "Formato de contraseña inválido",
  },
  email: {
    required: "El email es requerido",
    invalid: "Por favor ingrese un email válido",
  },
  phone: {
    required: "El teléfono es requerido",
    invalid: "El teléfono debe tener 9 dígitos",
  },
  dni: {
    required: "El DNI es requerido",
    invalid: "El DNI debe tener 8 dígitos",
  },
};
