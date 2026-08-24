# Worker test suites

Both suites run against a **deployed** worker, not a local one, because the
things most worth checking - one account reaching another's work, a class
signing in together from one address - only behave truthfully against the real
D1 and the real edge.

```bash
npx wrangler d1 execute utg-classroom --remote --file test/seed.sql
node test/api.mjs
node test/throttle.mjs
npx wrangler d1 execute utg-classroom --remote --file test/clean.sql
```

Always run `clean.sql` afterwards. Every fixture is named `zz.*` or `zz-*` so
it can be found and removed; nothing else in the database matches.

- **api.mjs** - the route surface, boundary cases first. A teacher from another
  class, a student reaching for the roster, a guessed project id, a hostile
  path, the project and size caps. 63 checks.
- **throttle.mjs** - sign-in throttling from the classroom's point of view: a
  class of twelve signing in from one address must all get in, and one student
  fumbling their password must not lock out the rest. 11 checks.

`seed.sql` is generated - if you need to change a password, regenerate the
hashes with `node hash.mjs <password>` and paste them in. `hash.mjs` runs the
same PBKDF2 the worker does.

Two things worth knowing before adding a test here:

**Don't test the client by accident.** `fetch` resolves a literal `../..` in a
path before the request leaves the process, so a traversal case written that
way measures Node, not the worker. Send encoded forms.

**Date fixtures now, not 1970.** The nightly cron deletes guest accounts that
have not been seen recently. A guest seeded with `last_seen = 1` disappears the
first time it runs, and the test that depends on it fails for a reason that has
nothing to do with the code.
