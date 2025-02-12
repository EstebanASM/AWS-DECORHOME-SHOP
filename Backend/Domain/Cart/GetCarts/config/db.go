package config

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql" // Importación del driver de MySQL
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *sql.DB
var ProductCollection *mongo.Collection

// ConectarDB conecta a la base de datos MySQL
func ConectarDB() {
	var err error
	// Reemplazar con tu cadena de conexión de MySQL
	dsn := "shop_user:shop_password@tcp(localhost:3306)/decorhome_shop"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	err = DB.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Conectado a MySQL!")
}

// ConectarMongoDB conecta a la base de datos MongoDB
func ConectarMongoDB() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	ProductCollection = client.Database("decorhome").Collection("products")
	fmt.Println("Conectado a MongoDB!")
}
