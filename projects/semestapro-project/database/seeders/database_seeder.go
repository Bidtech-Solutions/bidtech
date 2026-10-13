package seeders

// DatabaseSeeder is the entry point of `./artisan db:seed`.
type DatabaseSeeder struct{}

func (s *DatabaseSeeder) Signature() string { return "DatabaseSeeder" }

func (s *DatabaseSeeder) Run() error {
	if err := (&DistrictSeeder{}).Run(); err != nil {
		return err
	}
	// TODO(prd): sample listings when APP_ENV=local (docs/SCHEMA.md §12).
	return nil
}
