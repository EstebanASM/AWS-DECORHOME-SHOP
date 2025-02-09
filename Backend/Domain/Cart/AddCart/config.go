package config

import (
	"context"
	"database/sql"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	// DBMySQL será utilizada para ejecutar consultas sobre la base de datos MySQL.
	DBMySQL *sql.DB
	// MongoClient y MongoCollection se usan para acceder a MongoDB.
	MongoClient     *mongo.Client
	MongoCollection *mongo.Collection
)

// Init configura las conexiones a MySQL y MongoDB.
func Init() error {
	// --- Conexión a MySQL (Carrito de Compras) ---
	// DSN: usuario:contraseña@tcp(host:puerto)/nombre_basedatos
	mysqlDSN := "shop_user:shop_password@tcp(localhost:3306)/decorhome_shop"
	var err error
	DBMySQL, err = sql.Open("mysql", mysqlDSN)
	if err != nil {
		return err
	}
	if err = DBMySQL.Ping(); err != nil {
		return err
	}
	log.Println("Conectado a MySQL")

	// --- Conexión a MongoDB (Productos) ---
	mongoURI := "mongodb://localhost:27017"
	mongoDBName := "productsdb"       // nombre de la base de datos en Mongo
	mongoCollectionName := "products" // nombre de la colección

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	MongoClient, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		return err
	}
	if err = MongoClient.Ping(ctx, nil); err != nil {
		return err
	}
	log.Println("Conectado a MongoDB")
	MongoCollection = MongoClient.Database(mongoDBName).Collection(mongoCollectionName)

	return nil
}
