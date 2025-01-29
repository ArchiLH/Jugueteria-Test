export const registerUser = async (userData) => {
  try {
    // Realiza la solicitud POST a la API de registro con los datos del usuario
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar.");
    }

    return await response.json(); // Devuelve los datos en caso de éxito
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    throw new Error(
      "Error al conectar con el servidor. Por favor, intenta más tarde."
    );
  }
};