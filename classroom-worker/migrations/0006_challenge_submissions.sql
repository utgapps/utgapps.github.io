-- Python Coding Challenges: every project a student hands in for a challenge,
-- what the checker said about it, and the points it earned. Applied to the
-- live D1 on 2026-10-03 with:
--   npx wrangler d1 execute utg-classroom --remote --file migrations/0006_challenge_submissions.sql
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id            TEXT PRIMARY KEY,
  account_id    TEXT NOT NULL,
  challenge_id  TEXT NOT NULL,
  project_id    TEXT NOT NULL,
  project_title TEXT NOT NULL,
  files         TEXT NOT NULL,
  passed        INTEGER NOT NULL,
  points        INTEGER NOT NULL DEFAULT 0,
  notes         TEXT NOT NULL,
  created_at    INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_challenge_submissions_account ON challenge_submissions(account_id, challenge_id);
