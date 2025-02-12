package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/config"
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/routes"
	"github.com/gorilla/mux"
	"github.com/rs/cors" // Importa el paquete para habilitar CORS
)

func main() {
	// Conectar a MySQL
	config.ConectarDB()

	// Conectar a MongoDB
	config.ConectarMongoDB()

	// Configurar el router y las rutas
	router := mux.NewRouter()
	routes.RegistrarRutas(router)

	// Configurar CORS: Permitir solicitudes de todos los orígenes
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Permite solicitudes de todos los orígenes
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		ExposedHeaders:   []string{"Content-Length"},
		AllowCredentials: true,
	})

	// Iniciar el servidor con CORS habilitado
	fmt.Println("🚀 Servidor corriendo en http://localhost:8015")
	log.Fatal(http.ListenAndServe(":8015", corsHandler.Handler(router))) // Envolviendo el router con CORS
}
