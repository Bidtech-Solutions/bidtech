CREATE TABLE temp_uploads (
    id                TEXT    PRIMARY KEY,
    user_id           INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    object_key        TEXT    NOT NULL UNIQUE,
    thumb_key         TEXT    NOT NULL UNIQUE,
    width             INTEGER NOT NULL,
    height            INTEGER NOT NULL,
    size_bytes        INTEGER NOT NULL,
    thumb_size_bytes  INTEGER NOT NULL,
    created_at        DATETIME NOT NULL
);
--;;
CREATE INDEX temp_uploads_created ON temp_uploads(created_at);
