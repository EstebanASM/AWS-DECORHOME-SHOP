package services

import (
	"context"
	"time"

	"github.com/EstebanASM/AWS-DECORHOME-SHOP/Backend/Domain/Cart/AddCart/config"
	"go.mongodb.org/mongo-driver/bson"
)

// ProductExists verifica si el producto existe en MongoDB.
func ProductExists(productID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": productID}
	count, err := config.MongoCollection.CountDocuments(ctx, filter)
	return count > 0, err
}

// AddToCart inserta o actualiza un producto en MySQL.
func AddToCart(productID string, quantity int) error {
	query := `
		INSERT INTO cart (product_id, quantity, added_at, updated_at)
		VALUES (?, ?, NOW(), NOW())
		ON DUPLICATE KEY UPDATE quantity = quantity + ?, updated_at = NOW();
	`
	_, err := config.DBMySQL.Exec(query, productID, quantity, quantity)
	return err
}
