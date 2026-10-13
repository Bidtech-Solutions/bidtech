CREATE TABLE properties (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    code              TEXT    NOT NULL UNIQUE CHECK (code GLOB 'SP-[0-9][0-9][0-9][0-9][0-9]*'),
    slug              TEXT    NOT NULL UNIQUE,
    title             TEXT    NOT NULL CHECK (length(trim(title)) BETWEEN 10 AND 120),
    category          TEXT    NOT NULL CHECK (category IN ('rumah','ruko','apartemen','villa','gudang','lahan')),
    status            TEXT    NOT NULL DEFAULT 'available' CHECK (status IN ('available','sold')),
    price             INTEGER NOT NULL CHECK (price BETWEEN 1000000 AND 1000000000000),
    is_negotiable     INTEGER NOT NULL DEFAULT 0 CHECK (is_negotiable IN (0, 1)),
    is_featured       INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),

    district_id       INTEGER NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    area_name         TEXT    NULL CHECK (area_name IS NULL OR length(area_name) <= 100),
    address           TEXT    NULL CHECK (address IS NULL OR length(address) <= 255),
    maps_url          TEXT    NULL CHECK (maps_url IS NULL OR maps_url LIKE 'https://%'),

    land_area_m2      REAL    NULL CHECK (land_area_m2 IS NULL OR land_area_m2 > 0),
    building_area_m2  REAL    NULL CHECK (building_area_m2 IS NULL OR building_area_m2 > 0),
    bedrooms          INTEGER NULL CHECK (bedrooms IS NULL OR bedrooms BETWEEN 0 AND 50),
    bathrooms         INTEGER NULL CHECK (bathrooms IS NULL OR bathrooms BETWEEN 0 AND 50),
    specs             TEXT    NOT NULL DEFAULT '{}' CHECK (json_valid(specs) AND json_type(specs) = 'object'),

    description       TEXT    NOT NULL CHECK (length(description) BETWEEN 30 AND 5000),
    search_text       TEXT    NOT NULL,

    sold_at           DATETIME NULL,
    sold_by           INTEGER  NULL REFERENCES users(id) ON DELETE SET NULL,
    created_by        INTEGER  NULL REFERENCES users(id) ON DELETE SET NULL,
    updated_by        INTEGER  NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at        DATETIME NOT NULL,
    updated_at        DATETIME NOT NULL,

    CHECK ((status = 'sold') = (sold_at IS NOT NULL))
);
--;;
CREATE INDEX properties_status_created  ON properties(status, created_at DESC);
--;;
CREATE INDEX properties_status_price    ON properties(status, price);
--;;
CREATE INDEX properties_browse          ON properties(status, category, district_id, created_at DESC);
--;;
CREATE INDEX properties_district_status ON properties(district_id, status);
--;;
CREATE INDEX properties_featured        ON properties(created_at DESC) WHERE status = 'available' AND is_featured = 1;
