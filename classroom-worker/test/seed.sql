-- Throwaway accounts for the worker test suites.
--   zz.test.t101 / test-pw-101      instructor, ai101
--   zz.test.t102 / test-pw-102      instructor, ai102
--   zz.test.stu01..12 / test-pw-stu students, ai101  (a class, for throttling)
--   zz-guest                        a guest student, to prove reset refuses one
-- Every id and username starts with zz so clean.sql finds them all.
DELETE FROM accounts WHERE username LIKE 'zz.test.%' OR id LIKE 'zz-%';
INSERT INTO accounts (id, class_id, name, username, password_hash, password_salt, is_permanent, role, created_at, last_seen) VALUES
  ('zz-t101','ai101','ZZ Test T101','zz.test.t101','e7c56f13dcb1ec9ae874473d28bf0617d23dd6e708d511e8432427e88ddba584','8e12b90857538a16d11adf167825b61d',1,'instructor',1,1),
  ('zz-t102','ai102','ZZ Test T102','zz.test.t102','c14840fed1606165e9fb368f0b0bee6518af8c572cfefa7faa9762f9c133cdf4','9a4c0e4cf37c831ccb2abbb34f46d6f1',1,'instructor',1,1),
  ('zz-stu-01','ai101','ZZ Pupil 01','zz.test.stu01','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-02','ai101','ZZ Pupil 02','zz.test.stu02','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-03','ai101','ZZ Pupil 03','zz.test.stu03','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-04','ai101','ZZ Pupil 04','zz.test.stu04','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-05','ai101','ZZ Pupil 05','zz.test.stu05','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-06','ai101','ZZ Pupil 06','zz.test.stu06','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-07','ai101','ZZ Pupil 07','zz.test.stu07','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-08','ai101','ZZ Pupil 08','zz.test.stu08','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-09','ai101','ZZ Pupil 09','zz.test.stu09','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-10','ai101','ZZ Pupil 10','zz.test.stu10','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-11','ai101','ZZ Pupil 11','zz.test.stu11','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-stu-12','ai101','ZZ Pupil 12','zz.test.stu12','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1),
  ('zz-spare','ai101','ZZ Spare','zz.test.spare','3b299326bf2ff1eb0fec1a23b5cdc0b97c5848663cd0b4dc2db0627481287090','f8af083386f0c2d7b82da0c9ed4c6822',1,'student',1,1);
-- A guest, to prove the password reset refuses one. last_seen must be NOW:
-- the nightly reaper deletes guest accounts that have not been seen recently,
-- and a fixture dated 1970 vanishes the first time the cron runs.
INSERT INTO accounts (id, class_id, name, is_permanent, role, created_at, last_seen)
VALUES ('zz-guest','ai101','ZZ Test Guest',0,'student',
        CAST(strftime('%s','now') AS INTEGER) * 1000,
        CAST(strftime('%s','now') AS INTEGER) * 1000);
