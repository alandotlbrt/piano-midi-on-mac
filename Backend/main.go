package main

import(
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"PIANO-MIDI/routes"
	"PIANO-MIDI/utils"
)

func init() {
	utils.CreateDatabase()
}

func main() {
	fmt.Print("\033[37m")
	fmt.Println("Server Started: https://localhost:8080/")
	fmt.Print("\033[37m")
	staticPath := filepath.Join("..", "Frontend", "static")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(staticPath))))
	routes.SetupRoutes()
	err := http.ListenAndServe(":8080",nil)
	if err != nil {
		log.Fatal(err)
	}
}
