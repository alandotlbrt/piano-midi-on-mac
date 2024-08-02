package handler

import(
	"net/http"
	"path/filepath"
	"PIANO-MIDI/utils"
)
func HelloHandler(w http.ResponseWriter, r *http.Request){
	path := filepath.Join("../Frontend", "index.html")
	utils.Rendertemp(w,path)
}
