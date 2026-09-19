-- 0003 — student-to-student co-editing
--
-- A RECORD of statements applied by hand, same as 0001 and 0002. Apply with:
--
--   wrangler d1 export utg-classroom --remote --output backup-<date>.sql
--   wrangler d1 execute utg-classroom --remote --command "<each statement below>"
--
-- Purely additive: a new table and its indexes. Nothing existing changes, so it
-- is safe to run while the old worker is still serving - the old code simply
-- never looks at the table.
--
-- The code is eight Crockford base32 characters (no I, L, O or U), shown to
-- children as XXXX - XXXX. That is 32^8, but eight characters is still short
-- enough to be worth guessing at, so the lookup route charges its MISSES to the
-- address throttle and every room expires after four hours.
--
-- project_id is UNIQUE so that pressing "Co-edit" twice on one project hands
-- back the code that is already live instead of opening a second room that
-- half the table is connected to.

CREATE TABLE IF NOT EXISTS coedit_rooms (
  code       TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  host_id    TEXT NOT NULL,
  peer_id    TEXT NOT NULL,
  opened_at  INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_coedit_rooms_project ON coedit_rooms(project_id);
CREATE INDEX IF NOT EXISTS idx_coedit_rooms_expiry ON coedit_rooms(expires_at);
