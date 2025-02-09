package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/handlers"
)

func main() {
	// Ruta para WebSocket
	http.HandleFunc("/ws", handlers.HandleWS)

	port := 8015
	fmt.Printf("Servidor corriendo en el puerto %d\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal("Error iniciando el servidor:", err)
	}
}
