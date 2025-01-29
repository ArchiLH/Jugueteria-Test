export const loginUser = async (credentials) => {
  // manejo de errores
  try {
    // Realizar la solicitud de inicio de sesión al servidor 
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // aqui se envian las credenciales del usuario
      body: JSON.stringify({
        username: credentials.username, // Usamos 'username' en lugar de 'email'
        password: credentials.password,
      }),
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      const errorData = await response.json();  // Parsear la respuesta JSON si es un error
      console.log("Detalles del error del servidor:", errorData);

      if (response.status === 403) {
        throw new Error("Credenciales inválidas");
      }

      let errorMessage = errorData.message || "Error al iniciar sesión";
      throw new Error(errorMessage);
    }

    // Si la respuesta es válida, parsearla como JSON
    const data = await response.json();  // Convertir la respuesta a JSON
    console.log("Datos del servidor:", data);  // Ver los datos procesados

    // Almacenar el token y el ID en el localStorage
    localStorage.setItem("id", data.userId);
    localStorage.setItem("token", data.token);

    return {
      token: data.token,
      username: data.username, // Cambié 'email' por 'username'
      userId: data.userId,
    };
  } catch (error) {
    console.error("Error en login:", error);
    throw new Error(error.message || "Error de conexión");
  }
};
