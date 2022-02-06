package utilities

//Postgres Connection Config
import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

//Connects to database and returns a DB object that can be used in main function
func ConnectPostgres() (*sql.DB, error) {
	dotEnvErr := godotenv.Load(".env")
	if dotEnvErr != nil {
		log.Fatal(dotEnvErr)
	}

	host := os.Getenv("host")
	port := os.Getenv("port")
	user := os.Getenv("user")
	password := os.Getenv("password")
	dbname := os.Getenv("dbname")


	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	return db, err
}
