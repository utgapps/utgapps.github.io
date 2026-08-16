-- 0001 — multi-project support
--
-- This is a RECORD of statements applied by hand, not an automated migration
-- system. There is no d1_migrations bookkeeping table and adopting one now would
-- try to re-run this against a database that already has the columns.
--
-- Apply with, in order, taking the backup first:
--
--   wrangler d1 export utg-classroom --remote --output backup-<date>.sql
--   wrangler d1 execute utg-classroom --remote --command "<each statement below>"
--
-- Safe to run while the OLD worker is still live. In SQLite, ADD COLUMN with a
-- constant default is metadata-only: no table rewrite. The old worker's SELECT *
-- ignores the extra columns, and its INSERT still succeeds because every new
-- column is nullable or defaulted. That is what lets the schema go first and the
-- worker deploy second.
--
-- ADD COLUMN is NOT idempotent. Re-running gives "duplicate column name: kind",
-- which is the harmless "already applied" signal rather than a failure.
--
-- Never drop these columns to roll back. A Java project created in the meantime
-- would lose its type, and the old worker tolerates the new schema indefinitely.

ALTER TABLE projects ADD COLUMN kind TEXT NOT NULL DEFAULT 'web';
ALTER TABLE projects ADD COLUMN created_at INTEGER NOT NULL DEFAULT 0;
ALTER TABLE projects ADD COLUMN deleted_at INTEGER;

-- Cosmetic backfill only: existing rows sort correctly in the picker instead of
-- all claiming to have been created at epoch 0. No project data is touched.
UPDATE projects SET created_at = updated_at WHERE created_at = 0;

CREATE INDEX IF NOT EXISTS idx_projects_account_updated ON projects(account_id, updated_at DESC);
