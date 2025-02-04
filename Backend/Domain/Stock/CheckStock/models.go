package CheckStock

import "go.mongodb.org/mongo-driver/bson/primitive"

// Modelo para Stock
type Stock struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	ProductID string             `bson:"product_id" json:"product_id"`
	Stock     int                `bson:"stock" json:"stock"`
}
