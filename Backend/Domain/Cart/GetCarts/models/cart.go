package models

type CartItem struct {
	ID          int    `json:"id"`
	ProductID   string `json:"product_id"` // ID del producto, se maneja como string (se pasa de MongoDB a MySQL)
	Quantity    int    `json:"quantity"`
	AddedAt     string `json:"added_at"` // Convertido a string para evitar error de conversión
	UpdatedAt   string `json:"updated_at"`
	ProductName string `json:"product_name"` // Nuevo campo para el nombre del producto
}
