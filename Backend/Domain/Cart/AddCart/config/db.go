package config

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

// ConectarDB establece la conexión con MySQL
func ConectarDB() {
	var err error
	// DSN (Data Source Name) de MySQL: usuario:contraseña@host:puerto/nombre_de_base_de_datos
	dsn := "shop_user:shop_password@tcp(localhost:3306)/decorhome_shop"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("❌ Error al conectar a la base de datos:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("❌ No se pudo conectar a MySQL:", err)
	}

	fmt.Println("✅ Conexión exitosa a MySQL")
}
