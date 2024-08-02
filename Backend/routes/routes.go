package routes

//Contient la configuration des routes de l'application

import (
	"PIANO-MIDI/handler"
	"net/http"
)

func SetupRoutes() {
	http.HandleFunc("/", handler.HelloHandler)
}
