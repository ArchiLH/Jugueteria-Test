export const passwordService = {
  async changePassword(userId, passwordData) {
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      throw new Error("Sesión no válida");
    }

    const response = await fetch(
      `http://localhost:8080/auth/changePassword/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cambiar la contraseña");
    }

    return response.json();
  },
};
