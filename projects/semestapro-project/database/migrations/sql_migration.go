// Package migrations holds the schema migrations. Each migration is a pair of
// embedded SQL files (docs/SCHEMA.md); statements inside a file are separated by
// a line containing only "--;;" and run one by one through Schema().Sql().
package migrations

import (
	"embed"
	"fmt"
	"io/fs"
	"sort"
	"strings"

	"github.com/goravel/framework/contracts/database/schema"

	"semestapro/app/facades"
)

//go:embed sql/*.sql
var sqlFiles embed.FS

const statementSeparator = "--;;"

type sqlMigration struct {
	signature string
}

func (m *sqlMigration) Signature() string { return m.signature }

func (m *sqlMigration) Up() error { return m.run("up") }

func (m *sqlMigration) Down() error { return m.run("down") }

func (m *sqlMigration) run(direction string) error {
	raw, err := sqlFiles.ReadFile("sql/" + m.signature + "." + direction + ".sql")
	if err != nil {
		return fmt.Errorf("migrations.%s %s: %w", direction, m.signature, err)
	}
	for _, stmt := range SplitStatements(string(raw)) {
		if err := facades.Schema().Sql(stmt); err != nil {
			return fmt.Errorf("migrations.%s %s: %w", direction, m.signature, err)
		}
	}
	return nil
}

// SplitStatements splits a migration file into individual statements.
func SplitStatements(raw string) []string {
	var out []string
	for _, part := range strings.Split(raw, statementSeparator) {
		if s := strings.TrimSpace(part); s != "" {
			out = append(out, s)
		}
	}
	return out
}

// All returns every migration found in the embedded sql directory, ordered by
// signature (the timestamp prefix keeps them chronological).
func All() []schema.Migration {
	entries, err := fs.ReadDir(sqlFiles, "sql")
	if err != nil {
		panic(fmt.Errorf("migrations.All: %w", err))
	}
	var sigs []string
	for _, e := range entries {
		if name, ok := strings.CutSuffix(e.Name(), ".up.sql"); ok {
			sigs = append(sigs, name)
		}
	}
	sort.Strings(sigs)

	out := make([]schema.Migration, 0, len(sigs))
	for _, s := range sigs {
		out = append(out, &sqlMigration{signature: s})
	}
	return out
}
