CREATE TABLE activity_logs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NULL REFERENCES users(id) ON DELETE SET NULL,
    action        TEXT    NOT NULL,
    subject_type  TEXT    NULL CHECK (subject_type IS NULL OR subject_type IN ('property','user')),
    subject_id    INTEGER NULL,
    description   TEXT    NOT NULL,
    meta          TEXT    NOT NULL DEFAULT '{}' CHECK (json_valid(meta)),
    ip_address    TEXT    NULL,
    created_at    DATETIME NOT NULL
);
--;;
CREATE INDEX activity_logs_subject ON activity_logs(subject_type, subject_id, created_at DESC);
--;;
CREATE INDEX activity_logs_created ON activity_logs(created_at DESC);
