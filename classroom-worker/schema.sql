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
  kind       TEXT NOT NULL DEFAULT 'web',   -- 'web' | 'java'; fixed at creation
  files      TEXT NOT NULL,                 -- JSON: { filename: contents }
  created_at INTEGER NOT NULL DEFAULT 0,    -- picker order; updated_at reshuffles on every autosave
  updated_at INTEGER NOT NULL,
  deleted_at INTEGER,                       -- soft delete, reaped after 30 days
  share_slug TEXT,                          -- NULL = private. No username in it, on purpose.
  shared_at  INTEGER
);
CREATE INDEX IF NOT EXISTS idx_projects_account ON projects(account_id);
CREATE INDEX IF NOT EXISTS idx_projects_account_updated ON projects(account_id, updated_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_share_slug ON projects(share_slug);

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

-- Who a project is shared WITH. Redeeming a share code writes a row here and
-- the project is on that student's projects screen from then on, to open and
-- edit any day - not only while its owner has it in front of them.
--
-- The owner is still projects.account_id and is not listed here: they own it,
-- they alone can delete it or publish it. A member opens it, types in it and
-- renames it, and leaves by deleting their own row.
CREATE TABLE IF NOT EXISTS project_members (
  project_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  joined_at  INTEGER NOT NULL,
  PRIMARY KEY (project_id, account_id)
);
CREATE INDEX IF NOT EXISTS idx_project_members_account ON project_members(account_id);

-- A share code lets one student's project be opened by friends. The code is
-- what a child reads out loud across a table, so it is short (8 characters) and
-- drawn from Crockford base32 - no I, L, O or U, and O/I/L fold onto 0/1 when a
-- code is typed in. Short means guessable, so /coedit/<code> counts its MISSES
-- against the address throttle and every code dies after a few hours.
--
-- project_id is UNIQUE: pressing Share twice on the same project gives back the
-- same code rather than littering the table with rooms nobody is in.
--
-- The row is also the rendezvous for a project shared with several people. The
-- host is whichever of them has it open and is doing the saving - the owner
-- usually, but not always - and beat_at is that browser saying it is still
-- there. A room nobody has touched for two beats is free, and the next member
-- to open the project takes it over. There is exactly one writer at a time,
-- which is what keeps two students from saving over each other.
CREATE TABLE IF NOT EXISTS coedit_rooms (
  code       TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  host_id    TEXT NOT NULL,
  peer_id    TEXT NOT NULL,
  opened_at  INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  beat_at    INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_coedit_rooms_project ON coedit_rooms(project_id);
CREATE INDEX IF NOT EXISTS idx_coedit_rooms_expiry ON coedit_rooms(expires_at);

-- A small, durable login throttle. The key is a one-way hash of the visitor IP.
CREATE TABLE IF NOT EXISTS rate_limits (
  key      TEXT PRIMARY KEY,
  count    INTEGER NOT NULL,
  reset_at INTEGER NOT NULL
);

-- Browser-scoped classroom-code attempts. Wrong-code hashes are retained only
-- long enough to avoid counting the same typo twice in one attempt cycle.
CREATE TABLE IF NOT EXISTS access_lockouts (
  browser_key           TEXT PRIMARY KEY,
  attempted_code_hashes TEXT NOT NULL DEFAULT '[]',
  attempt_count         INTEGER NOT NULL DEFAULT 0,
  lock_level            INTEGER NOT NULL DEFAULT 0,
  locked_until          INTEGER,
  updated_at            INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_access_lockouts_locked_until ON access_lockouts(locked_until);

-- Root-site access profiles. The actual four-character codes are only stored
-- as hashes; the browser receives a profile only after it proves the code.
CREATE TABLE IF NOT EXISTS site_access (
  code_hash           TEXT PRIMARY KEY,
  code_plain          TEXT,                     -- the letter code, shown to the admin only
  label               TEXT NOT NULL,
  enabled             INTEGER NOT NULL DEFAULT 1,
  tools               TEXT NOT NULL,
  print_allowed       INTEGER NOT NULL DEFAULT 0,
  play                TEXT NOT NULL DEFAULT '[]',
  classroom_class_id  TEXT,
  classroom_role      TEXT,
  hours               TEXT,
  updated_at          INTEGER NOT NULL
);

-- A short-lived, one-use handoff from the root access gate to the Classroom
-- app. It contains no code and expires before it can become a durable login.
CREATE TABLE IF NOT EXISTS classroom_access_grants (
  token       TEXT PRIMARY KEY,
  class_id    TEXT NOT NULL,
  role        TEXT NOT NULL,
  expires_at  INTEGER NOT NULL,
  used_at     INTEGER
);
CREATE INDEX IF NOT EXISTS idx_classroom_access_grants_expiry ON classroom_access_grants(expires_at);

-- Classrooms an account has connected to, so teachers and students re-enter
-- from a saved list instead of retyping a code. These are per-account records
-- (deleted with the account); they are NOT the class codes themselves.
CREATE TABLE IF NOT EXISTS account_classrooms (
  account_id TEXT NOT NULL,
  class_id   TEXT NOT NULL,
  role       TEXT NOT NULL,               -- 'student' | 'instructor'
  label      TEXT NOT NULL,
  last_used  INTEGER NOT NULL,
  PRIMARY KEY (account_id, class_id, role)
);
CREATE INDEX IF NOT EXISTS idx_account_classrooms_account ON account_classrooms(account_id);

-- Small global key/value store for server-side settings that must never live in
-- the public site. The demo AI key (settings.key = 'demo_ai_key') lives here so a
-- checkpoint slide can fetch it at runtime for a signed-in teacher and run for
-- real, without the key ever being committed to the repo.
CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  updated_by TEXT
);
