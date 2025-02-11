package models

// CartItem representa un ítem en el carrito de compras
type CartItem struct {
	ID        int    `json:"id"`         // ID del carrito
	ProductID string `json:"product_id"` // ID del producto en el carrito
	Quantity  int    `json:"quantity"`   // Cantidad del producto en el carrito
	AddedAt   string `json:"added_at"`   // Fecha de cuando se añadió el ítem al carrito
	UpdatedAt string `json:"updated_at"` // Fecha de la última actualización del ítem
}
