-- UTG Classroom — D1 schema

CREATE TABLE IF NOT EXISTS accounts (
  id            TEXT PRIMARY KEY,
  class_id      TEXT NOT NULL,
  name          TEXT NOT NULL,              -- display name (what a guest types)
  username      TEXT UNIQUE,                -- permanent accounts only (nullable)
  password_hash TEXT,                       -- permanent accounts only
  password_salt TEXT,
  is_permanent  INTEGER NOT NULL DEFAULT 0, -- 0 = guest (wiped after TTL), 1 = kept
  role          TEXT NOT NULL DEFAULT 'student', -- 'student' | 'admin'
  created_at    INTEGER NOT NULL,           -- epoch ms
  last_seen     INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_accounts_class_name ON accounts(class_id, name);

CREATE TABLE IF NOT EXISTS projects (
  id         TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  title      TEXT NOT NULL,
  files      TEXT NOT NULL,                 -- JSON: { filename: contents }
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_projects_account ON projects(account_id);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS media (
  id         TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  name       TEXT NOT NULL,
  kind       TEXT NOT NULL,                 -- 'image' | 'audio'
  mime       TEXT NOT NULL,
  size       INTEGER NOT NULL,
  r2_key     TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_media_account ON media(account_id);

-- Classroom login codes are intentionally stored only as hashes. They are
-- login credentials, not the public PeerJS room address.
CREATE TABLE IF NOT EXISTS class_access (
  class_id             TEXT PRIMARY KEY,
  student_code_hash    TEXT NOT NULL,
  instructor_code_hash TEXT NOT NULL,
  instructor_account_id TEXT NOT NULL,
  updated_at           INTEGER NOT NULL
);

-- The instructor record is shared between authorized instructor devices.
CREATE TABLE IF NOT EXISTS classrooms (
  class_id   TEXT PRIMARY KEY,
  record     TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  updated_by TEXT NOT NULL
);

-- A live room uses a fresh, unguessable PeerJS id for each class session.
CREATE TABLE IF NOT EXISTS live_rooms (
  class_id   TEXT PRIMARY KEY,
  peer_id    TEXT NOT NULL,
  opened_by  TEXT NOT NULL,
  opened_at  INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_live_rooms_expiry ON live_rooms(expires_at);

-- A small, durable login throttle. The key is a one-way hash of the visitor IP.
CREATE TABLE IF NOT EXISTS rate_limits (
  key      TEXT PRIMARY KEY,
  count    INTEGER NOT NULL,
  reset_at INTEGER NOT NULL
);
