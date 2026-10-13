package config

import (
	"github.com/goravel/framework/contracts/database/driver"
	sqlitefacades "github.com/goravel/sqlite/facades"
	"semestapro/app/facades"
)

func init() {
	config := facades.Config()
	config.Add("database", map[string]any{
		// Default database connection name
		"default": config.Env("DB_CONNECTION", "sqlite"),
		// Database connections
		"connections": map[string]any{
			"sqlite": map[string]any{
				// DSN lengkap untuk ncruces/go-sqlite3. Pragma WAL, FK, dan busy_timeout
				// diterapkan di setiap koneksi baru. Lihat docs/SCHEMA.md §2.
				"dsn": "file:" + config.Env("DB_DATABASE", "storage/database/semestapro.db").(string) +
					"?_pragma=journal_mode(WAL)" +
					"&_pragma=busy_timeout(5000)" +
					"&_pragma=foreign_keys(1)" +
					"&_pragma=synchronous(NORMAL)" +
					"&_pragma=temp_store(MEMORY)" +
					"&_pragma=cache_size(-16000)" +
					"&_txlock=immediate",
				"database": config.Env("DB_DATABASE", "storage/database/semestapro.db"),
				"prefix":   "",
				"singular": false,
				"via": func() (driver.Driver, error) {
					return sqlitefacades.Sqlite("sqlite")
				},
			},
		},
		// Pool configuration
		"pool": map[string]any{
			// Sets the maximum number of connections in the idle
			// connection pool.
			//
			// If MaxOpenConns is greater than 0 but less than the new MaxIdleConns,
			// then the new MaxIdleConns will be reduced to match the MaxOpenConns limit.
			//
			// If n <= 0, no idle connections are retained.
			"max_idle_conns": 8,
			// Sets the maximum number of open connections to the database.
			//
			// If MaxIdleConns is greater than 0 and the new MaxOpenConns is less than
			// MaxIdleConns, then MaxIdleConns will be reduced to match the new
			// MaxOpenConns limit.
			//
			// If n <= 0, then there is no limit on the number of open connections.
			"max_open_conns": 8,
			// Sets the maximum amount of time a connection may be idle.
			//
			// Expired connections may be closed lazily before reuse.
			//
			// If d <= 0, connections are not closed due to a connection's idle time.
			// Unit: Second
			"conn_max_idletime": 0,
			// Sets the maximum amount of time a connection may be reused.
			//
			// Expired connections may be closed lazily before reuse.
			//
			// If d <= 0, connections are not closed due to a connection's age.
			// Unit: Second
			"conn_max_lifetime": 0,
		},
		// Sets the threshold for slow queries in milliseconds, the slow query will be logged.
		// Unit: Millisecond
		"slow_threshold": 200,
		// Migration Repository Table
		//
		// This table keeps track of all the migrations that have already run for
		// your application. Using this information, we can determine which of
		// the migrations on disk haven't actually been run in the database.
		"migrations": map[string]any{
			"table": "migrations",
		},
	})
}
