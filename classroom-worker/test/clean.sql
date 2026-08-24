-- Remove everything the worker test suites create.
-- Matches 'zz.%' rather than 'zz.test.%': the browser walkthrough enrols
-- students through the UI with names of its own, and one of those survived a
-- narrower pattern. Every fixture this project makes starts with zz.
DELETE FROM projects WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.%' OR id LIKE 'zz-%');
DELETE FROM sessions WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.%' OR id LIKE 'zz-%');
DELETE FROM media WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.%' OR id LIKE 'zz-%');
DELETE FROM account_classrooms WHERE account_id IN (SELECT id FROM accounts WHERE username LIKE 'zz.%' OR id LIKE 'zz-%');
DELETE FROM accounts WHERE username LIKE 'zz.%' OR id LIKE 'zz-%';
-- Any project the suites made under a real account, and orphans left behind.
DELETE FROM projects WHERE title LIKE 'ZZ %';
DELETE FROM account_classrooms WHERE account_id NOT IN (SELECT id FROM accounts);
