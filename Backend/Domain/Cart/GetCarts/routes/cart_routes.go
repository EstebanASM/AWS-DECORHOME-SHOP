package routes

import (
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/GetCarts/controllers"
	"github.com/gorilla/mux"
)

func RegistrarRutas(router *mux.Router) {
	router.HandleFunc("/getcart", controllers.GetCart).Methods("GET")
}
