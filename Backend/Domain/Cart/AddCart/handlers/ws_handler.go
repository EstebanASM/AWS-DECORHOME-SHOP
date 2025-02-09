package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Permite solicitudes solo desde http://localhost:5173
		if r.Header.Get("Origin") == "http://localhost:5173" {
			return true
		}
		return false
	},
}

func HandleWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading connection:", err)
		return
	}
	// Aquí puedes manejar la conexión WebSocket
	defer conn.Close()

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}

		// Aquí envías la respuesta al cliente
		if err := conn.WriteMessage(messageType, p); err != nil {
			fmt.Println("Error writing message:", err)
			break
		}
	}
}
