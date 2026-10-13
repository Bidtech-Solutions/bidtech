package controllers

import (
	"time"

	"github.com/goravel/framework/contracts/http"

	"semestapro/app/viewmodels"
)

type HomeController struct{}

func NewHomeController() *HomeController { return &HomeController{} }

// Index renders the public home page (FR-HOME-*). Listings are added with the
// listing service; for now this is the layout skeleton.
func (c *HomeController) Index(ctx http.Context) http.Response {
	data := viewmodels.Page(viewmodels.Meta{
		Title:       "Semesta Pro — Jual Beli Rumah Secondary di Batam",
		Description: "Katalog rumah, ruko, apartemen, villa, gudang, dan lahan secondary di Batam dari Semesta Pro. Foto lengkap, harga jelas, konsultasi lewat WhatsApp.",
		Canonical:   "/",
	}, map[string]any{
		"Year": time.Now().In(time.FixedZone("WIB", 7*3600)).Year(),
	})
	return ctx.Response().View().Make("public/home.tmpl", data)
}
