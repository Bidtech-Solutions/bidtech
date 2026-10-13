package config

import (
	"github.com/gin-gonic/gin/render"
	"github.com/goravel/framework/contracts/route"
	goravelgin "github.com/goravel/gin"
	ginfacades "github.com/goravel/gin/facades"

	"semestapro/app/facades"
	viewsupport "semestapro/app/support/view"
)

func init() {
	config := facades.Config()
	config.Add("http", map[string]any{
		"default": "gin",
		// HTTP Drivers
		"drivers": map[string]any{
			"gin": map[string]any{
				// Unggahan foto hingga 15 MB per berkas (docs/PRD.md FR-IMG-02).
				"body_limit":   16384,
				"header_limit": 4096,
				"route": func() (route.Route, error) {
					return ginfacades.Route("gin"), nil
				},
				// FuncMap template (rupiah, tanggal, asset, dll). Lihat docs/ARCHITECTURE.md §6.3.
				"template": func() (render.HTMLRender, error) {
					return goravelgin.NewTemplate(goravelgin.RenderOptions{
						FuncMap: viewsupport.Funcs(viewsupport.Deps{
							MediaURL:      func() string { return facades.Config().GetString("filesystems.disks.media.url") },
							PublicDir:     "public",
							WhatsAppPhone: func() string { return facades.Config().GetString("site.whatsapp") },
						}),
					})
				},
			},
		},
		// HTTP URL
		"url": config.Env("APP_URL", "http://localhost"),
		// HTTP Host
		"host": config.Env("APP_HOST", "127.0.0.1"),
		// HTTP Port
		"port": config.Env("APP_PORT", "3000"),
		// HTTP Timeout (detik). Dinaikkan dari 3 dtk bawaan karena pemrosesan foto bisa lebih lama.
		"request_timeout": config.Env("HTTP_REQUEST_TIMEOUT", 30),
		// HTTPS Configuration
		"tls": map[string]any{
			// HTTPS Host
			"host": config.Env("APP_HOST", "127.0.0.1"),
			// HTTPS Port
			"port": config.Env("APP_PORT", "3000"),
			// SSL Certificate, you can put the certificate in /public folder
			"ssl": map[string]any{
				// ca.pem
				"cert": "",
				// ca.key
				"key": "",
			},
		},
		// Default Client Name
		//
		// This determines which client is used when you call facades.Http() or
		// facades.Http().Client() without passing a specific name.
		"default_client": config.Env("HTTP_CLIENT_DEFAULT", "default"),
		// Client Configurations
		//
		// Here you may define multiple independent client configurations.
		// For example, you might have a "github" client with a specific base URL
		// and a "stripe" client with a longer timeout.
		"clients": map[string]any{
			"default": map[string]any{
				// The base URL for the client. All requests made using this client
				// will be relative to this URL.
				"base_url": config.Env("HTTP_CLIENT_BASE_URL", ""),
				// The maximum amount of time a request can take, including connection
				// establishment, redirects, and reading the response body.
				"timeout": config.Env("HTTP_CLIENT_TIMEOUT", "30s"),
				// The maximum number of idle (keep-alive) connections to keep across
				// ALL hosts. Increasing this helps reuse TCP connections.
				"max_idle_conns": config.Env("HTTP_CLIENT_MAX_IDLE_CONNS", 100),
				// The maximum number of idle (keep-alive) connections to keep PER host.
				// By default, Go sets this to 2, which is often a bottleneck.
				// Increase this value for high-throughput applications.
				"max_idle_conns_per_host": config.Env("HTTP_CLIENT_MAX_IDLE_CONNS_PER_HOST", 2),
				// The maximum total number of connections (active + idle) allowed per host.
				// A value of 0 means no limit.
				"max_conns_per_host": config.Env("HTTP_CLIENT_MAX_CONN_PER_HOST", 0),
				// The maximum amount of time an idle (keep-alive) connection will remain
				// in the pool before closing itself.
				"idle_conn_timeout": config.Env("HTTP_CLIENT_IDLE_CONN_TIMEOUT", "90s"),
			},
		},
	})
}
