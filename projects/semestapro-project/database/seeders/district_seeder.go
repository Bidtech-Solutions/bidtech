package seeders

import (
	"fmt"

	"semestapro/app/domain/catalog"
	"semestapro/app/facades"
)

// DistrictSeeder upserts the 12 kecamatan of Kota Batam. Safe to run repeatedly.
type DistrictSeeder struct{}

func (s *DistrictSeeder) Signature() string { return "DistrictSeeder" }

func (s *DistrictSeeder) Run() error {
	const upsert = `INSERT INTO districts (id, slug, name, city, sort_order) VALUES (?, ?, ?, 'Batam', ?)
ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, name = excluded.name, sort_order = excluded.sort_order`

	for i, d := range catalog.Districts {
		if _, err := facades.Orm().Query().Exec(upsert, d.ID, d.Slug, d.Name, i+1); err != nil {
			return fmt.Errorf("DistrictSeeder: upsert %s: %w", d.Slug, err)
		}
	}
	return nil
}
