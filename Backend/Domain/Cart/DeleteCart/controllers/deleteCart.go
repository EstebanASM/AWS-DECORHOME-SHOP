package controllers

import (
	"fmt"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/DeleteCart/config"
	"github.com/gorilla/mux"
)

// DeleteCart maneja la solicitud DELETE para eliminar un producto del carrito por su ID
func DeleteCart(w http.ResponseWriter, r *http.Request) {
	// Obtener el ID del producto desde los parámetros de la URL
	vars := mux.Vars(r)
	productID := vars["productID"]

	// Verificar si el producto existe en el carrito
	_, err := config.DB.Exec("DELETE FROM cart WHERE product_id = ?", productID)
	if err != nil {
		http.Error(w, "Error al eliminar el producto del carrito", http.StatusInternalServerError)
		return
	}

	// Responder con éxito
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "✅ Producto con ID %s eliminado del carrito.", productID)
}
