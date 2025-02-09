package config

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	// Conexión a MySQL
	DBMySQL *sql.DB
	// Conexión a MongoDB
	MongoClient     *mongo.Client
	MongoCollection *mongo.Collection
)

// Init inicializa las conexiones a MySQL y MongoDB.
func Init() error {
	// --- Conexión a MySQL ---
	mysqlDSN := "shop_user:shop_password@tcp(localhost:3306)/decorhome_shop"
	var err error
	DBMySQL, err = sql.Open("mysql", mysqlDSN)
	if err != nil {
		return fmt.Errorf("error abriendo MySQL: %w", err)
	}
	if err = DBMySQL.Ping(); err != nil {
		return fmt.Errorf("error haciendo ping a MySQL: %w", err)
	}
	log.Println("✅ Conectado a MySQL")

	// --- Conexión a MongoDB ---
	mongoURI := "mongodb://localhost:27017"
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	MongoClient, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		return fmt.Errorf("error conectando a MongoDB: %w", err)
	}
	if err = MongoClient.Ping(ctx, nil); err != nil {
		return fmt.Errorf("error haciendo ping a MongoDB: %w", err)
	}
	log.Println("✅ Conectado a MongoDB")

	MongoCollection = MongoClient.Database("db_products").Collection("products")

	return nil
}
