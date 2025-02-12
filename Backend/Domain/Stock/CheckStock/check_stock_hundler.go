package CheckStock

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/websocket"
)

// Configuración de WebSocket
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Manejador WebSocket para verificar stock
func CheckStockHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("❌ Error al establecer WebSocket:", err)
		return
	}
	defer conn.Close()

	for {
		// Leer solicitud desde WebSocket
		var request map[string]string
		err := conn.ReadJSON(&request)
		if err != nil {
			log.Println("❌ Error al leer mensaje:", err)
			return
		}

		productID := request["product_id"]

		// Consultar stock en la base de datos
		stock, err := CheckStockInDB(productID)
		if err != nil {
			conn.WriteJSON(map[string]string{"error": "Error al verificar stock"})
			continue
		}

		// Enviar la respuesta con el stock disponible
		if stock.Stock == 0 {
			conn.WriteJSON(map[string]string{"message": "❌ Stock agotado para el producto: " + productID})
		} else {
			conn.WriteJSON(map[string]string{"message": "✅ Stock disponible: " + strconv.Itoa(stock.Stock)})
		}
	}
}
