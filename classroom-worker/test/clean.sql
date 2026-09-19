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
-- Sharing outlives the project row it points at, so these run AFTER the
-- deletes above: a share code or a membership for a project that is gone is
-- exactly what is left behind by a suite that made one.
DELETE FROM project_members WHERE account_id LIKE 'zz-%' OR project_id NOT IN (SELECT id FROM projects);
DELETE FROM coedit_rooms WHERE host_id LIKE 'zz-%' OR project_id NOT IN (SELECT id FROM projects);
DELETE FROM account_classrooms WHERE account_id NOT IN (SELECT id FROM accounts);
