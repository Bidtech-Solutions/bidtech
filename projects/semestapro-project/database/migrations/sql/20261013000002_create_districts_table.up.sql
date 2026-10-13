CREATE TABLE districts (
    id          INTEGER PRIMARY KEY,
    slug        TEXT    NOT NULL UNIQUE CHECK (slug GLOB '[a-z]*' AND slug NOT GLOB '*[^a-z-]*'),
    name        TEXT    NOT NULL,
    city        TEXT    NOT NULL DEFAULT 'Batam',
    sort_order  INTEGER NOT NULL DEFAULT 0
);
