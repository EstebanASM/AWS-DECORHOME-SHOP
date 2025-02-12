package main

import (
	"CheckStock" // Importa correctamente el paquete CheckStock
	"log"
	"net/http"
)

func main() {
	// Inicializar base de datos
	CheckStock.InitDB()        // Llamar a InitDB del paquete CheckStock
	defer CheckStock.CloseDB() // Llamar a CloseDB del paquete CheckStock

	// Configurar las rutas
	http.HandleFunc("/check-stock", CheckStock.CheckStockHandler) // Usar CheckStockHandler

	// Iniciar el servidor WebSocket
	log.Println("Servidor WebSocket corriendo en ws://localhost:8099/check-stock")
	log.Fatal(http.ListenAndServe(":8099", nil))
}
