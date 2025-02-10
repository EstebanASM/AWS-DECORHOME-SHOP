package routes

import (
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/controllers"
	"github.com/gorilla/mux"
)

// RegistrarRutas registra las rutas para el carrito
func RegistrarRutas(router *mux.Router) {
	router.HandleFunc("/cart", controllers.AddToCart).Methods("POST")
}
