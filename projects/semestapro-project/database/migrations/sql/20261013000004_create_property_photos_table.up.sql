CREATE TABLE property_photos (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id       INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    position          INTEGER NOT NULL CHECK (position BETWEEN 0 AND 7),
    object_key        TEXT    NOT NULL UNIQUE,
    thumb_key         TEXT    NOT NULL UNIQUE,
    width             INTEGER NOT NULL CHECK (width  BETWEEN 1 AND 1280),
    height            INTEGER NOT NULL CHECK (height BETWEEN 1 AND 1280),
    size_bytes        INTEGER NOT NULL CHECK (size_bytes BETWEEN 1 AND 307200),
    thumb_size_bytes  INTEGER NOT NULL CHECK (thumb_size_bytes BETWEEN 1 AND 61440),
    created_at        DATETIME NOT NULL,
    UNIQUE (property_id, position)
);
