-- Remove everything test/api.mjs created.
DELETE FROM projects WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.test.%' OR id LIKE 'zz-%');
DELETE FROM sessions WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.test.%' OR id LIKE 'zz-%');
DELETE FROM account_classrooms WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.test.%' OR id LIKE 'zz-%');
DELETE FROM accounts WHERE username LIKE 'zz.test.%' OR id LIKE 'zz-%';
