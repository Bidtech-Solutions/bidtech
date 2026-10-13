package main

import (
	"semestapro/bootstrap"
)

func main() {
	app := bootstrap.Boot()

	app.Start()
}
