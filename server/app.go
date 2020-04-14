package main

import (
	"fmt"
	"log"
	"net/http"
)

func addCors(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,GET")
		h.ServeHTTP(w, r)
	}
}

func main() {
	mux := http.NewServeMux()

	fd := http.FileServer(http.Dir("./data"))
	mux.Handle("/", fd)

	fmt.Println("App Listening on 8000")
	err := http.ListenAndServe(":8000", addCors(mux))
	if err != nil {
		log.Fatal(err)
	}
}
