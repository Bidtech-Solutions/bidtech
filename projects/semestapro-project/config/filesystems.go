package config

import (
	"github.com/goravel/framework/contracts/filesystem"
	"github.com/goravel/framework/support/path"
	s3facades "github.com/goravel/s3/facades"

	"semestapro/app/facades"
)

func init() {
	config := facades.Config()
	config.Add("filesystems", map[string]any{
		// Default Filesystem Disk
		//
		// Here you may specify the default filesystem disk that should be used
		// by the framework. The "local" disk, as well as a variety of cloud
		// based disks are available to your application. Just store away!
		"default": config.Env("FILESYSTEM_DISK", "local"),

		// Filesystem Disks
		//
		// Here you may configure as many filesystem "disks" as you wish, and you
		// may even configure multiple disks of the same driver. Defaults have
		// been set up for each driver as an example of the required values.
		//
		// Supported Drivers: "local", "custom" (s3 via goravel/s3)
		"disks": map[string]any{
			"local": map[string]any{
				"driver": "local",
				"root":   path.Storage("app"),
			},
			"public": map[string]any{
				"driver": "local",
				"root":   path.Storage("app/public"),
				"url":    config.Env("APP_URL", "").(string) + "/storage",
			},
			// Foto properti di RustFS (S3-compatible). Lihat docs/ARCHITECTURE.md §15.
			"media": map[string]any{
				"driver":         "custom",
				"key":            config.Env("MEDIA_KEY"),
				"secret":         config.Env("MEDIA_SECRET"),
				"region":         config.Env("MEDIA_REGION", "us-east-1"),
				"bucket":         config.Env("MEDIA_BUCKET", "semestapro-media"),
				"url":            config.Env("MEDIA_URL"),
				"endpoint":       config.Env("MEDIA_ENDPOINT", "http://127.0.0.1:9000"),
				"use_path_style": config.Env("MEDIA_USE_PATH_STYLE", true),
				"via": func() (filesystem.Driver, error) {
					return s3facades.S3("media") // kunci di "disks"
				},
			},
		},
	})
}
