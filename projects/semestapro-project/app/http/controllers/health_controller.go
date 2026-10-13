package controllers

import (
	"github.com/goravel/framework/contracts/http"

	"semestapro/app/facades"
)

type HealthController struct{}

func NewHealthController() *HealthController { return &HealthController{} }

// Check reports liveness and database reachability for Docker healthcheck/Nginx/uptime
// monitors. It never exposes internal error details.
func (c *HealthController) Check(ctx http.Context) http.Response {
	var one int
	if err := facades.Orm().Query().Raw("SELECT 1").Scan(&one); err != nil {
		facades.Log().Errorf("healthz: database check failed: %v", err)
		return ctx.Response().Json(http.StatusServiceUnavailable, http.Json{"status": "error"})
	}
	return ctx.Response().Json(http.StatusOK, http.Json{"status": "ok"})
}
