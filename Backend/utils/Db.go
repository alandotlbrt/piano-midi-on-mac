package utils

import(
	"log"
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)

func CreateDatabase() {
	db, err := sql.Open("sqlite3","../Database/Db.sqlite")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()
	r := `
	CREATE TABLE IF NOT EXISTS Auth (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Username VARCHAR(20) NOT NULL UNIQUE,
		Password VARCHAR(50) NOT NULL,
		Email VARCHAR(100) NOT NULL UNIQUE
	);
	CREATE TABLE IF NOT EXISTS User (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Username VARCHAR(20) NOT NULL,
		Email VARCHAR(100) NOT NULL,
		Name VARCHAR(20) NOT NULL,
		Password VARCHAR(50) NOT NULL,
		Inscription VARCHAR(10) NOT NULL,
		Birthday VARCHAR(10) NOT NULL,
		Lastname VARCHAR(20) NOT NULL,
		FOREIGN KEY (Username, Email) REFERENCES Auth (Username, Email)
	);
	`

	_, err = db.Exec(r)
	if err != nil {
		log.Println("CREATE ERROR")
		fmt.Println(err)
		}
	}
