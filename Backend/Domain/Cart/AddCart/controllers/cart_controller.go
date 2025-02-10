package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/config"
	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive" // Importa el paquete para trabajar con ObjectId
)

// AddToCart maneja la inserción de productos en el carrito
func AddToCart(w http.ResponseWriter, r *http.Request) {
	var item models.CartItem
	err := json.NewDecoder(r.Body).Decode(&item)
	if err != nil {
		http.Error(w, "Error al leer los datos", http.StatusBadRequest)
		return
	}

	// Validación básica
	if item.ProductID == "" || item.Quantity <= 0 {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	// Convertir el ProductID de string a ObjectId (MongoDB lo maneja como ObjectId)
	objectID, err := primitive.ObjectIDFromHex(item.ProductID)
	if err != nil {
		http.Error(w, "ID de producto no válido", http.StatusBadRequest)
		return
	}

	// Verificar si el producto existe en MongoDB
	var result bson.M
	err = config.ProductCollection.FindOne(context.TODO(), bson.M{"_id": objectID}).Decode(&result)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			http.Error(w, "Producto no encontrado", http.StatusNotFound)
		} else {
			http.Error(w, "Error al consultar MongoDB", http.StatusInternalServerError)
		}
		return
	}

	// Insertar en la base de datos MySQL como string
	query := "INSERT INTO cart (product_id, quantity) VALUES (?, ?)"
	resultSQL, err := config.DB.Exec(query, item.ProductID, item.Quantity)
	if err != nil {
		http.Error(w, "Error al agregar al carrito", http.StatusInternalServerError)
		return
	}

	// Obtener el ID del producto agregado
	insertedID, err := resultSQL.LastInsertId()
	if err != nil {
		http.Error(w, "Error al obtener el ID del producto agregado", http.StatusInternalServerError)
		return
	}

	// Responder con éxito
	fmt.Fprintf(w, "✅ Producto agregado al carrito con ID: %d", insertedID)
	fmt.Printf("Datos recibidos: product_id: %v, quantity: %d\n", item.ProductID, item.Quantity)
}
