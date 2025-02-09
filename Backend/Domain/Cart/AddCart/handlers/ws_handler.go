package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"Backend/Domain/Cart/AddCart/models"
	"Backend/Domain/Cart/AddCart/services"

	"github.com/gorilla/websocket"
)

// Configuración del WebSocket: se permite cualquier origen (útil para pruebas)
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// HandleWebSocket gestiona las conexiones WebSocket.
func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error al hacer upgrade a WebSocket:", err)
		return
	}
	defer conn.Close()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error al leer mensaje:", err)
			break
		}

		var item models.CartItem
		if err := json.Unmarshal(msg, &item); err != nil {
			log.Println("Error al decodificar JSON:", err)
			conn.WriteMessage(websocket.TextMessage, []byte("Formato JSON inválido"))
			continue
		}
		log.Printf("Recibido: %+v\n", item)

		// Verificar que el producto exista en MongoDB.
		exists, err := services.ProductExists(item.ProductID)
		if err != nil {
			log.Printf("Error verificando producto en MongoDB: %v", err)
			conn.WriteMessage(websocket.TextMessage, []byte("Error interno"))
			continue
		}
		if !exists {
			conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("El producto %s no existe", item.ProductID)))
			continue
		}

		// Agregar el producto al carrito en MySQL.
		if err = services.AddToCart(item.ProductID, item.Quantity); err != nil {
			log.Printf("Error al agregar al carrito: %v", err)
			conn.WriteMessage(websocket.TextMessage, []byte("Error al agregar el producto al carrito"))
			continue
		}

		conn.WriteMessage(websocket.TextMessage, []byte("Producto agregado al carrito"))
	}
}
