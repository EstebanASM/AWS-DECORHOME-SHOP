package main

import (
	"log"
	"net/http"

	"Backend/Domain/Cart/AddCart/config"
	"Backend/Domain/Cart/AddCart/handlers"
)

func main() {
	// Inicializar la configuración y conexiones a las bases de datos.
	if err := config.Init(); err != nil {
		log.Fatalf("Error en la inicialización: %v", err)
	}

	// Configurar la ruta para el WebSocket.
	http.HandleFunc("/ws", handlers.HandleWebSocket)

	port := 8080
	log.Printf("Servidor WebSocket escuchando en :%d", port)
	if err := http.ListenAndServe(":8020", nil); err != nil {
		log.Fatalf("Error en ListenAndServe: %v", err)
	}
}
