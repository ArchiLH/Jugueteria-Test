import { useEffect, useState } from "react";
import { Input } from "../ui/Input.jsx";
import { useNavigate } from "react-router-dom";

const DatosPersonales = ({ errors, handleChange }) => {
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    email: "",
    phone: "",
    dni: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id"); // Obtener el id del localStorage
    console.log("User ID from localStorage:", userId); // Verificar el valor del ID

    if (!userId) {
      setError("El id del usuario no es válido");
      navigate("/login"); // Redirigir al login si no hay ID
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token
        const response = await fetch(
          `http://localhost:8080/auth/obtenerUsuarioPorId/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Agregar token en el encabezado
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        console.log("Datos del usuario:", data);

        // Actualizar el estado del formulario con los datos recibidos
        setFormData({
          username: data.username || "",
          lastname: data.lastname || "",
          email: data.email || "",
          phone: data.phone || "",
          dni: data.dni || "",
        });
      } catch (err) {
        console.error(err);
        setError("Error al obtener los datos del usuario");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Datos Personales</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <Input
          label="Nombre"
          type="text"
          name="username"
          placeholder="Ingrese su Nombre"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
        <Input
          label="Apellido"
          type="text"
          name="lastname"
          placeholder="Ingrese su Apellido"
          value={formData.lastname}
          onChange={handleChange}
          error={errors.lastname}
          required
        />
        <Input
          label="Correo"
          type="email"
          name="email"
          placeholder="Ingrese su Correo"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          label="Teléfono"
          type="tel"
          name="phone"
          placeholder="Ingrese su Teléfono"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        <Input
          label="DNI"
          type="text"
          name="dni"
          placeholder="Ingrese su Documento de Identidad"
          value={formData.dni}
          onChange={handleChange}
          error={errors.dni}
          required
        />
      </div>
    </div>
  );
};

export default DatosPersonales;
