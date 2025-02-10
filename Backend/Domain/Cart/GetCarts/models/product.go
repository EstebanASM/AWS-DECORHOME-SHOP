package models

// Product representa el modelo de un producto en MongoDB
type Product struct {
	ID   string `json:"id" bson:"_id"`    // ID del producto, almacenado como string en MongoDB
	Name string `json:"name" bson:"name"` // Nombre del producto
}
