package migrations

import (
	"io/fs"
	"strings"
	"testing"
)

func TestSplitStatements(t *testing.T) {
	got := SplitStatements("CREATE TABLE a (id INTEGER);\n--;;\nCREATE INDEX i ON a(id);\n--;;\n\n")
	if len(got) != 2 || !strings.HasPrefix(got[1], "CREATE INDEX") {
		t.Fatalf("unexpected statements: %q", got)
	}
}

func TestEveryUpHasDown(t *testing.T) {
	ups, downs := map[string]bool{}, map[string]bool{}
	entries, _ := fs.ReadDir(sqlFiles, "sql")
	for _, e := range entries {
		if n, ok := strings.CutSuffix(e.Name(), ".up.sql"); ok {
			ups[n] = true
		}
		if n, ok := strings.CutSuffix(e.Name(), ".down.sql"); ok {
			downs[n] = true
		}
	}
	if len(ups) == 0 {
		t.Fatal("no migrations embedded")
	}
	for n := range ups {
		if !downs[n] {
			t.Errorf("migration %s has no down file", n)
		}
	}
}
