package services

import (
	"context"
	"time"

	"Backend/Domain/Cart/AddCart/config"

	"go.mongodb.org/mongo-driver/bson"
)

// ProductExists verifica en MongoDB si el producto existe.
// Se asume que el producto se identifica por el campo "_id".
func ProductExists(productID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": productID}
	count, err := config.MongoCollection.CountDocuments(ctx, filter)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

// AddToCart inserta o actualiza un producto en la tabla "cart" de MySQL.
// Se asume que la tabla tiene una restricción UNIQUE sobre "product_id".
func AddToCart(productID string, quantity int) error {
	query := `
		INSERT INTO cart (product_id, quantity, added_at, updated_at)
		VALUES (?, ?, NOW(), NOW())
		ON DUPLICATE KEY UPDATE quantity = quantity + ?,
		                        updated_at = NOW();
	`
	_, err := config.DBMySQL.Exec(query, productID, quantity, quantity)
	return err
}
