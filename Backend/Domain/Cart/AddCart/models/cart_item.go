package models

// CartItem representa un producto que se quiere agregar al carrito.
type CartItem struct {
	ProductID string `json:"product_id"`
	Quantity  int    `json:"quantity"`
}
