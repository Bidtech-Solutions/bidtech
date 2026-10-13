package bootstrap

import (
	"github.com/goravel/framework/contracts/database/schema"

	"semestapro/database/migrations"
)

func Migrations() []schema.Migration {
	return migrations.All()
}
