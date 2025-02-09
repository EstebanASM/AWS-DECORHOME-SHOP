// Conexión al servidor WebSocket
const socket = new WebSocket("ws://localhost:8015/ws");

socket.onopen = () => {
  console.log("Conectado al servidor WebSocket");
};

socket.onmessage = (event) => {
  console.log("Mensaje recibido:", event.data);
};

socket.onclose = () => {
  console.log("Desconectado del servidor WebSocket");
};

// Función para enviar un mensaje al servidor
const addToCartWebSocket = (productID: string, quantity: number) => {
  const message = JSON.stringify({ product_id: productID, quantity });
  socket.send(message);
};

// Exporta las funciones para usarlas en otros archivos
export { addToCartWebSocket, socket };
