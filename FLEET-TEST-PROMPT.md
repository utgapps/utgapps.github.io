# Fleet test prompt

Copy everything in the fenced block below into Claude Code on a student PC.
Fill in the four bracketed values first — see "Where to get the blanks" at the
bottom of this file.

Re-run this whenever the gateway address, the fleet Chrome policy, or the
classroom build changes. The parts that matter are the ones that can only be
answered on real hardware in real Chrome; everything else has already been
covered by the automated suites in `ai101/test/` and `classroom-worker/test/`.

---

```
You are testing UTG Academy's AI classroom on a student PC before term starts.
Report what you measure. Do not fix anything, do not change any file, and do not
install anything.

FILL THESE IN BEFORE YOU START (the person who gave you this prompt has them):
  STUDENT_CODE  = [4-character student class code]
  STUDENT_NAME  = FleetTest
  CLASS_KEY     = [sk-class-... one student key from the gateway]
  INSTRUCTOR_CODE = [4-character instructor code, or "skip"]

=== RULE 1: WHICH BROWSER ===
Every browser check must run in this PC's real Chrome — the one a student
double-clicks. Do NOT use an in-app, embedded, or preview browser for anything
touching https://ai.tail5091fc.ts.net. Those return net::ERR_BLOCKED_BY_CLIENT
no matter how correct the app is, and a previous run of this test was thrown
away for exactly that reason.

If you have the Claude-in-Chrome tools they drive real Chrome and are fine.
If you do not, launch Chrome yourself and ask the person sitting at the PC to
read the results back to you. Say plainly which of the two you used.

=== RULE 2: REPORTING ===
Quote exact numbers, exact status codes and exact error text. If something is
inconclusive say "unproven" rather than guessing. A blocked request is a
finding, not a failure to report around.

------------------------------------------------------------------------
PART 1 — the machine itself (no browser)
------------------------------------------------------------------------
1. tailscale status          -> is this PC on the tailnet, and is the node
                                named "ai" visible and online?
2. nslookup ai.tail5091fc.ts.net   -> what address does MagicDNS return?
3. curl -s -o NUL -w "%{http_code} %{time_total}s\n" https://ai.tail5091fc.ts.net/healthz
4. curl -s https://ai.tail5091fc.ts.net/healthz
   -> record "accepting_work". If it is false the GPU is mining; the first
      request of a lesson wakes it. Note it and carry on.
5. curl -s -H "Authorization: Bearer CLASS_KEY" https://ai.tail5091fc.ts.net/v1/models
6. A real chat call:
   curl -s -m 240 -H "Authorization: Bearer CLASS_KEY" -H "content-type: application/json" -d "{\"model\":\"fast\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with exactly: PONG\"}],\"max_tokens\":10}" https://ai.tail5091fc.ts.net/v1/chat/completions
   If it answers "server_overloaded / just waking up", wait 60 seconds and
   retry up to 4 times. Report how many attempts it took — that is the delay a
   teacher will see at the start of a lesson.
7. Same call with "stream":true added. Confirm the reply arrives as
   "data: {...}" lines containing choices[0].delta.content.

------------------------------------------------------------------------
PART 2 — Chrome vs the gateway  (THE IMPORTANT ONE)
------------------------------------------------------------------------
In real Chrome open:  https://utgapps.github.io/gateway-test.html

It runs ten variants by itself and prints a line like
  RESULT  A1 B1 C1 D0 E1 F1 G1 H1 I1 J1
Report that line verbatim, plus the whole table (each row's verdict and the
detail text beside it).

Then open Chrome DevTools -> Console on that page and report any red errors
verbatim, especially anything saying ERR_BLOCKED_BY_CLIENT, ERR_FAILED,
"Mixed Content", "Private Network Access", or "local-network-access".

Row D is the one that decides everything: it is exactly the sandbox the code
editor puts student work in. If D is blocked, student projects cannot call the
AI no matter what the lesson says.

------------------------------------------------------------------------
PART 3 — a student's real first lesson, end to end
------------------------------------------------------------------------
In real Chrome:
1. Go to https://utgapps.github.io/  and enter STUDENT_CODE at the gate.
2. Open "My Classwork". Join with STUDENT_NAME and STUDENT_CODE.
3. Make a new project, choose HTML / CSS / JavaScript. Confirm the file tree
   shows index.html, style.css, script.js down the left.
4. Confirm the "Java - writing only" option exists and says running it in the
   browser is not built yet. Do not create one.
5. In index.html type:   <h1>hello</h1>
   Press Run. Does the preview show it? Does anything run BEFORE you press Run?
   (Nothing should.)
6. Type a deliberate mistake into script.js:   notAFunction();
   Press Run. The console panel under the preview must name the error AND the
   file and line. Report exactly what it says.
7. Now the real thing. Open https://utgapps.github.io/ai101/week-15.html in
   another tab, copy each of the three files into the matching file in your
   project, and replace sk-class-put-your-own-key-here with CLASS_KEY.
8. Press Run, type "Hello, who are you?" into the chat box and press Send.
   - Does a reply appear?
   - Does it arrive gradually (streaming) or all at once?
   - How many seconds until the first word?
   Report the reply text, or the exact error if there is none.
9. Press "Share a link". Open the link it gives you in a NEW tab.
   - Does the project load and work there?
   - Does the page show your name or username anywhere? (It must not.)
10. Sign out and sign back in with the same name and code. Is your project
    still there?

------------------------------------------------------------------------
PART 4 — the teacher's side  (skip if INSTRUCTOR_CODE is "skip")
------------------------------------------------------------------------
In real Chrome, go to https://utgapps.github.io/classroom/?instructor=1 and
enter INSTRUCTOR_CODE.
1. Open the AI101 classroom. Does the right-hand panel show 15 week chips?
2. Click week 4. Press "Present slides".
   - Does a deck fill the screen?
   - Do the left/right arrow keys move between slides without clicking first?
   - Does "f" go full screen, and Escape come back out?
   - Report the slide count shown (e.g. "1 / 11").
3. Switch to the "Lesson plan" tab.
   - Does it open already scrolled to Week 4, or does it start at the top?
   - Is the week heading visible, or hidden under the bar?
4. Press Close. Does it return to the classroom with nothing left over?
5. Press "Add week 4 to my projects", then "My projects" in the top bar.
   - Is it there, named "Week 4 - First conversation"?
   - Open it, type a line, click "My projects", reopen it. Is the line still
     there AND is it still called "Week 4 - First conversation"?
     (If it is now called "My project", that is a bug — say so loudly.)
6. Back in the class, use "+ Add a student to this class" to add
   name "Fleet Pupil", accept the suggested username and password, and WRITE
   THE PASSWORD DOWN. Then sign in as that student in a private window to
   confirm it works.
7. Pick that student and use the password reset. Confirm the old password
   stops working and the new one works.

------------------------------------------------------------------------
PART 5 — report
------------------------------------------------------------------------
Give me:
  - Which browser you used, and whether you drove it or a person did.
  - PART 1: one line per check with the actual numbers.
  - PART 2: the RESULT line verbatim, the full table, and any console errors.
  - PART 3: pass/fail per step, the AI reply text, and the timing.
  - PART 4: pass/fail per step.
  - A final VERDICT: can a student sit at this PC and complete week 15 of
    AI101 today? Yes or no, and if no, the single thing that stops them.
  - Anything you could not test, and why.

Do not summarise away a failure. If one step blocks the next, say so and
report everything up to that point.
```

---

## Where to get the blanks

| Blank | Where |
|---|---|
| `STUDENT_CODE` | The four-character student code for AI101. The teacher has it; an admin can set a new one from `utgapps.github.io/admin/`. It is not stored in readable form anywhere, so it cannot be looked up — only replaced. |
| `CLASS_KEY` | `C:\AI\projects\UTG AI Class API\gateway\config\students.json` on the AI machine — take any one entry's `key`. Treat it like a password: it is a real key with a real rate limit. |
| `INSTRUCTOR_CODE` | Same place as the student code. Put `skip` here to leave the teacher flows out. |
| `STUDENT_NAME` | Anything. Use `FleetTest` so the account is easy to find and remove afterwards. |

## Afterwards

The test leaves a guest student called `FleetTest` — and, if Part 4 ran, an
account called `Fleet Pupil` and a couple of projects. Remove them with:

```
cd "C:\School Software\utgapps.github.io\classroom-worker"
npx wrangler d1 execute utg-classroom --remote --command "DELETE FROM projects WHERE account_id IN (SELECT id FROM accounts WHERE name IN ('FleetTest','Fleet Pupil')); DELETE FROM accounts WHERE name IN ('FleetTest','Fleet Pupil')"
```

## What this test is for

Everything else is already covered without a fleet PC: the course build, the
fifteen milestones, the published deliverables, the whole worker API and
sign-in throttling all have automated suites that run from any machine. What
those suites cannot see is a browser on the school's own hardware talking to a
gateway on a private tailnet address — which is precisely where this system has
failed before. Parts 2 and 3 are the point; the rest is context for reading them.
