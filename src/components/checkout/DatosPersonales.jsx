import { useEffect, useState } from "react";
import { Input } from "../ui/Input.jsx";
import { useNavigate } from "react-router-dom";

const DatosPersonales = ({ errors, handleChange, formData }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      setError("El id del usuario no es válido");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/auth/obtenerUsuarioPorId/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData = await response.json();

        handleChange({ target: { name: "username", value: userData.username || "" } });
        handleChange({ target: { name: "lastname", value: userData.lastname || "" } });
        handleChange({ target: { name: "email", value: userData.email || "" } });
        handleChange({ target: { name: "phone", value: userData.phone || "" } });
        handleChange({ target: { name: "dni", value: userData.dni || "" } });

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al obtener los datos del usuario");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, handleChange]);

  if (isLoading) {
    return <p>Cargando datos del usuario...</p>;
  }

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
