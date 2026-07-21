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
