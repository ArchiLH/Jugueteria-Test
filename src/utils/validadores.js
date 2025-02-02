export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^\d{9}$/.test(phone);
};

export const validateDNI = (dni) => {
  return /^\d{8}$/.test(dni);
};

export const validatePassword = {
  hasMinLength: (password) => password.length >= 8,
  hasUpperCase: (password) => /[A-Z]/.test(password),
  hasLowerCase: (password) => /[a-z]/.test(password),
  hasNumber: (password) => /\d/.test(password),
  isValid: (password) => {
    const validations = [
      validatePassword.hasMinLength(password),
      validatePassword.hasUpperCase(password),
      validatePassword.hasLowerCase(password),
      validatePassword.hasNumber(password),
    ];
    return validations.every((validation) => validation === true);
  },
  getMissingRequirements: (password) => {
    const missing = [];

    if (!validatePassword.hasMinLength(password)) {
      missing.push("Mínimo 8 caracteres");
    }
    if (!validatePassword.hasUpperCase(password)) {
      missing.push("Una letra mayúscula");
    }
    if (!validatePassword.hasLowerCase(password)) {
      missing.push("Una letra minúscula");
    }
    if (!validatePassword.hasNumber(password)) {
      missing.push("Un número");
    }
    // if (!validatePassword.hasSpecialChar(password)) {
    //   missing.push("Un carácter especial");
    // }

    return missing;
  },
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
  passwordChange: {
    currentRequired: "La contraseña actual es requerida",
    newRequired: "La nueva contraseña es requerida",
    confirmRequired: "Debe confirmar la nueva contraseña",
    passwordsMismatch: "Las contraseñas no coinciden",
    sameAsOld: "La nueva contraseña no puede ser igual a la actual",
    requirements: {
      minLength: "La contraseña debe tener al menos 8 caracteres",
      uppercase: "Debe incluir al menos una letra mayúscula",
      lowercase: "Debe incluir al menos una letra minúscula",
      number: "Debe incluir al menos un número",
    },
  },
};
