-- Reviewing Python Coding Challenges: an admin can pass a project by hand,
-- which keeps a copy of its code, and a project the AI checker turns down still
-- passes when it closely matches one of those copies. Applied to the live D1 on
-- 2026-10-03 with:
--   npx wrangler d1 execute utg-classroom --remote --file migrations/0007_challenge_review.sql
ALTER TABLE challenge_submissions ADD COLUMN approved_by TEXT;
ALTER TABLE challenge_submissions ADD COLUMN approved_at INTEGER;
ALTER TABLE challenge_submissions ADD COLUMN matched_id TEXT;
ALTER TABLE challenge_submissions ADD COLUMN match_score REAL;
CREATE INDEX IF NOT EXISTS idx_challenge_submissions_challenge ON challenge_submissions(challenge_id, created_at);
CREATE TABLE IF NOT EXISTS challenge_approved (
  id               TEXT PRIMARY KEY,
  challenge_id     TEXT NOT NULL,
  submission_id    TEXT NOT NULL UNIQUE,
  account_id       TEXT NOT NULL,
  student_name     TEXT NOT NULL,
  project_title    TEXT NOT NULL,
  files            TEXT NOT NULL,
  approved_by      TEXT NOT NULL,
  approved_by_name TEXT NOT NULL,
  created_at       INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_challenge_approved_challenge ON challenge_approved(challenge_id);
