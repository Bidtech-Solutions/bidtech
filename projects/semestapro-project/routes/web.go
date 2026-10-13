package routes

import (
	"semestapro/app/facades"
	"semestapro/app/http/controllers"
)

func Web() {
	// Static assets (css, js, fonts) from ./public served at /static.
	facades.Route().Static("static", "./public")

	home := controllers.NewHomeController()
	facades.Route().Get("/", home.Index)

	health := controllers.NewHealthController()
	facades.Route().Get("/healthz", health.Check)
}
