package models

import "time"

// CartItem representa un ítem en el carrito de compras
type CartItem struct {
	ID        int       `json:"id,omitempty"`         // ID del carrito en MySQL
	ProductID string    `json:"product_id"`           // ID del producto, se maneja como string (se pasa de MongoDB a MySQL)
	Quantity  int       `json:"quantity"`             // Cantidad del producto en el carrito
	AddedAt   time.Time `json:"added_at,omitempty"`   // Fecha de cuando se añadió el ítem al carrito
	UpdatedAt time.Time `json:"updated_at,omitempty"` // Fecha de la última actualización del ítem
}
