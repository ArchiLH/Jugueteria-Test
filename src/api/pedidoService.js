export const pedidoService = {
  async crearPedido(pedidoData) {
    try {
      const token = localStorage.getItem("token");
      // Formatear los datos según la estructura de tu backend
      const pedidoFormateado = {
        numeroOrden: `ORD-${Date.now()}`, // Generar número de orden único
        fecha: new Date().toISOString(), // Fecha actual
        estado: "PENDIENTE",
        total: pedidoData.total, // Convertir a BigDecimal
        usuario: {
          id: pedidoData.usuarioId,
        },
        detalles: pedidoData.productos.map((producto) => ({
          producto: {
            id: producto.productoId,
          },
          cantidad: producto.cantidad,
          precioUnitario: producto.precioUnitario,
          subtotal: (producto.cantidad * producto.precioUnitario)
            .toFixed(2)
            .toString(),
        })),
      };
      const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedidoFormateado),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear el pedido");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en crear pedido:", error);
      throw error;
    }
  },

  // Obtener pedidos de un usuario
  async obtenerPedidosUsuario(usuarioId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/pedidos/usuario/${usuarioId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error al obtener los pedidos");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en obtener pedidos de usuario:", error);
      throw error;
    }
  },

  // Obtener un pedido específico
  async obtenerPedido(pedidoId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/pedidos/${pedidoId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error al obtener el pedido");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en obtener pedido:", error);
      throw error;
    }
  },
};
