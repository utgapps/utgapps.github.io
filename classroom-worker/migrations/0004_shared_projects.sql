-- 0004 — a shared project stays shared
--
-- A RECORD of statements applied by hand, same as 0001 to 0003. Apply with:
--
--   wrangler d1 export utg-classroom --remote --output backup-<date>.sql
--   wrangler d1 execute utg-classroom --remote --command "<each statement below>"
--
-- Additive: one new table, one new index, one new column with a default. The
-- old worker never looks at either, so these can go in before it is deployed.
--
-- Until now a code let a friend into somebody's editor for the afternoon and
-- they left with nothing. project_members is what makes it stick: redeeming a
-- code writes a row, and from then on the project is on that student's own
-- projects screen to open and edit any day, whoever happens to be online.
--
-- The owner is NOT listed here - they are still projects.account_id, and they
-- remain the only account that can delete the project or publish it. A member
-- may open it, type in it and rename it, and leaves by deleting their own row.
--
-- coedit_rooms.beat_at turns the room into a rendezvous. Whole files go to D1
-- on a debounce, so two members with the project open would save over each
-- other; instead ONE browser holds the room and does the saving while the
-- others type through the live document. The holder touches beat_at every
-- half minute, and a room nobody has touched for two beats is free for the
-- next member who opens the project. DEFAULT 0 makes every room that exists
-- when this runs look stale, which is correct - nothing is beating yet, and
-- the first browser to open each project claims it.

CREATE TABLE IF NOT EXISTS project_members (
  project_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  joined_at  INTEGER NOT NULL,
  PRIMARY KEY (project_id, account_id)
);

CREATE INDEX IF NOT EXISTS idx_project_members_account ON project_members(account_id);

ALTER TABLE coedit_rooms ADD COLUMN beat_at INTEGER NOT NULL DEFAULT 0;
