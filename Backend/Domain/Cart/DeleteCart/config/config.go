package config

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql" // Importación del driver de MySQL
)

var DB *sql.DB

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
