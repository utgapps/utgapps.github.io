-- 0002 — opt-in project sharing
--
-- A RECORD of statements applied by hand, same as 0001. Apply with:
--
--   wrangler d1 export utg-classroom --remote --output backup-<date>.sql
--   wrangler d1 execute utg-classroom --remote --command "<each statement below>"
--
-- Additive and safe to run while the old worker is live: SQLite ADD COLUMN with
-- no default is metadata-only, and every existing row simply has share_slug NULL,
-- which means "not shared". Nothing becomes public by being migrated.
--
-- share_slug deliberately contains NO username. It is the project title slugged,
-- plus random characters, so a link cannot be guessed and does not tell a
-- stranger who wrote it. UNIQUE is what stops two projects colliding.

ALTER TABLE projects ADD COLUMN share_slug TEXT;
ALTER TABLE projects ADD COLUMN shared_at INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_share_slug ON projects(share_slug);
