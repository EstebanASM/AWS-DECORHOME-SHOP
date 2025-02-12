package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/GetCarts/config"
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/GetCarts/models"
)

// GetCart maneja la solicitud GET para obtener los productos en el carrito
func GetCart(w http.ResponseWriter, r *http.Request) {
	// Consultar todos los productos en el carrito desde MySQL
	rows, err := config.DB.Query("SELECT id, product_id, quantity, added_at, updated_at FROM cart")
	if err != nil {
		http.Error(w, "Error al obtener los productos del carrito", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var cartItems []models.CartItem

	for rows.Next() {
		var item models.CartItem
		if err := rows.Scan(&item.ID, &item.ProductID, &item.Quantity, &item.AddedAt, &item.UpdatedAt); err != nil {
			http.Error(w, "Error al leer los productos del carrito", http.StatusInternalServerError)
			return
		}
		cartItems = append(cartItems, item)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error al iterar sobre los productos", http.StatusInternalServerError)
		return
	}

	// Responder con los productos en formato JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cartItems)
}
