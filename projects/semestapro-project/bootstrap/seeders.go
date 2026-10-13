package bootstrap

import (
	"github.com/goravel/framework/contracts/database/seeder"

	"semestapro/database/seeders"
)

func Seeders() []seeder.Seeder {
	return []seeder.Seeder{
		&seeders.DatabaseSeeder{},
		&seeders.DistrictSeeder{},
	}
}
