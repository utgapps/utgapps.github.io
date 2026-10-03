-- 0005 — register an account to access codes
--
-- A RECORD of statements applied by hand, same as 0001 to 0004. Apply with:
--
--   wrangler d1 export utg-classroom --remote --output backup-<date>.sql
--   wrangler d1 execute utg-classroom --remote --command "<each statement below>"
--
-- Additive: one new table and its index. The old worker never looks at them,
-- so they can go in before it is deployed.
--
-- A student who signs in with a username and password saw an empty hub: only
-- a typed class code unlocked modules. An admin now ticks, per account, the
-- codes it is registered to, and the account sees everything those codes
-- unlock. The row names the code by its hash, so replacing a code (or setting
-- a classroom's codes again) moves its rows to the new hash.

CREATE TABLE IF NOT EXISTS account_access (
  account_id TEXT NOT NULL,
  code_hash  TEXT NOT NULL,
  granted_at INTEGER NOT NULL,
  PRIMARY KEY (account_id, code_hash)
);

CREATE INDEX IF NOT EXISTS idx_account_access_code ON account_access(code_hash);
