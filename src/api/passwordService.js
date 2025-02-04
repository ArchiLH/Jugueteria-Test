export const passwordService = {
  async changePassword(userId, passwordData) {
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      throw new Error("Sesión no válida");
    }

    try {
      const response = await fetch(
        `http://localhost:8080/auth/changePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword,
          }),
        },
      );

      // Primero verifica si la respuesta es un JSON válido
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error al cambiar la contraseña");
        }
        return data;
      } else {
        // Si no es JSON, obtén el texto de la respuesta
        const text = await response.text();
        if (!response.ok) {
          throw new Error(text || "Error al cambiar la contraseña");
        }
        return { message: text };
      }
    } catch (error) {
      throw new Error(error.message || "Error de conexión");
    }
  },
};
