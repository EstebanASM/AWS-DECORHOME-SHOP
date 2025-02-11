package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/DeleteCart/config"
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/DeleteCart/routes"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Conectar a MySQL
	config.ConectarDB()

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
	fmt.Println("🚀 Servidor corriendo en http://localhost:8020")
	log.Fatal(http.ListenAndServe(":8020", handler))
}
