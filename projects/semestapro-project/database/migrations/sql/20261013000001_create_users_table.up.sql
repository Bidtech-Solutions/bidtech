CREATE TABLE users (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT    NOT NULL CHECK (length(trim(name)) BETWEEN 2 AND 80),
    email            TEXT    NOT NULL COLLATE NOCASE,
    phone            TEXT    NULL     CHECK (phone IS NULL OR phone GLOB '+62[0-9]*'),
    password_hash    TEXT    NOT NULL,
    is_master        INTEGER NOT NULL DEFAULT 0 CHECK (is_master IN (0, 1)),
    is_active        INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
    session_version  INTEGER NOT NULL DEFAULT 1,
    last_login_at    DATETIME NULL,
    created_by       INTEGER NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at       DATETIME NOT NULL,
    updated_at       DATETIME NOT NULL,
    CHECK (NOT (is_master = 1 AND is_active = 0))
);
--;;
CREATE UNIQUE INDEX users_email_unique ON users(email);
--;;
CREATE UNIQUE INDEX users_single_master ON users(is_master) WHERE is_master = 1;
