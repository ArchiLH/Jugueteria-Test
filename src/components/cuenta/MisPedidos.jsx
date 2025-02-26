import React, { useEffect, useState } from 'react';

const MisPedidos = ({ token }) => {
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("Token recibido en MisPedidos:", token);  // Verifica si llega el token

        if (!token) {
            setError("Token no disponible. Inicia sesión nuevamente.");
            return;
        }

        const fetchPedidos = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/pedidos", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("No se pudieron obtener los pedidos.");

                const data = await response.json();
                setPedidos(data);
            } catch (error) {
                console.error("Error al obtener los pedidos:", error.message);
                setError("No se pudieron cargar los pedidos.");
            }
        };

        fetchPedidos();
    }, [token]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
            {error && <p className="text-red-500">{error}</p>}
            {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                    <div key={pedido.id} className="border p-4 mb-4 rounded-lg shadow-lg">
                        <p><strong>ID del Pedido:</strong> {pedido.eventId}</p>
                        
                        <p><strong>Monto:</strong> {pedido.amount / 100} {pedido.currency?.toUpperCase()}</p>
                        
                        <p><strong>Estado:</strong> {pedido.status}</p>
                        {pedido.receiptUrl && (
                            <p>
                                <strong>Recibo:</strong> <a href={pedido.receiptUrl} target="_blank" rel="noopener noreferrer">Ver Recibo</a>
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>No hay pedidos disponibles.</p>
            )}
        </div>
    );
};

export default MisPedidos;
