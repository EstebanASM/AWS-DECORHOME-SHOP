package CheckStock

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Variables globales para la conexión a MongoDB
var client *mongo.Client
var stockCollection *mongo.Collection

// Inicializar la base de datos
func InitDB() {
	var err error
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27018")

	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("❌ Error al conectar a MongoDB:", err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("❌ MongoDB no responde:", err)
	}

	stockCollection = client.Database("db_stock").Collection("stock")
	log.Println("✅ Base de datos conectada correctamente")
}

// Función para verificar stock en la base de datos
func CheckStockInDB(productID string) (Stock, error) {
	log.Printf("🔍 Verificando producto con ID: '%s'", productID)
	var stock Stock
	filter := bson.M{"product_id": productID} // Búsqueda en MongoDB
	err := stockCollection.FindOne(context.Background(), filter).Decode(&stock)

	if err != nil {
		log.Printf("❌ No se encontró stock para product_id %s: %v", productID, err)
		return Stock{}, err
	}

	log.Printf("✅ Stock encontrado: %+v", stock)
	return stock, nil
}

// Cerrar la conexión a la base de datos
func CloseDB() {
	if client != nil {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal("❌ Error al cerrar la conexión a MongoDB:", err)
		}
		log.Println("✅ Conexión a MongoDB cerrada correctamente")
	}
}
