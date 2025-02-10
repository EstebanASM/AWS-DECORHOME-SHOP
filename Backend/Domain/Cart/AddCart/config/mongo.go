package config

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client
var ProductCollection *mongo.Collection

// ConectarMongoDB establece la conexión con la base de datos MongoDB
func ConectarMongoDB() {
	var err error
	// URI de conexión de MongoDB
	MongoClient, err = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal("❌ Error al conectar a MongoDB:", err)
	}

	err = MongoClient.Connect(context.TODO())
	if err != nil {
		log.Fatal("❌ Error al conectar a MongoDB:", err)
	}

	// Accedemos a la colección de productos en la base de datos db_products
	ProductCollection = MongoClient.Database("db_products").Collection("products")
	fmt.Println("✅ Conexión exitosa a MongoDB")
}
