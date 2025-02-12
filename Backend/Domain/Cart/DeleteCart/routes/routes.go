package routes

import (
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/DeleteCart/controllers"
	"github.com/gorilla/mux"
)

// RegistrarRutas registra las rutas necesarias para el microservicio de eliminación del carrito
func RegistrarRutas(router *mux.Router) {
	// Ruta para eliminar un producto del carrito por su ID
	router.HandleFunc("/deletecart/{productID}", controllers.DeleteCart).Methods("DELETE")
}
