package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/GetCarts/config"
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/GetCarts/routes"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Conectar a MySQL
	config.ConectarDB()

	// Conectar a MongoDB
	config.ConectarMongoDB()

	// Configurar el router y las rutas
	router := mux.NewRouter()
	routes.RegistrarRutas(router)

	// Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Permite todas las direcciones
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	})

	// Iniciar el servidor con CORS habilitado
	handler := c.Handler(router)
	fmt.Println("🚀 Servidor corriendo en http://localhost:8016")
	log.Fatal(http.ListenAndServe(":8016", handler))
}
