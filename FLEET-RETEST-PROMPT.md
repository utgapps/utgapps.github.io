# Fleet retest prompt — verify the two fixes

Copy the fenced block into Claude Code on a student PC. The credentials are
already filled in (they are live — rotate them from `utgapps.github.io/admin/`
after testing if this file travels).

This is a focused retest of two fixes plus the one end-to-end path the last run
could not reach. It is not the full battery — that already passed. If you want
the whole thing again, use `FLEET-TEST-PROMPT.md`.

---

```
You are re-testing two fixes on UTG Academy's AI classroom, on a student PC.
Report what you measure. Do NOT fix anything, change any file, or install
anything.

CREDENTIALS (already filled in):
  STUDENT_CODE    = JTR8
  CLASS_KEY       = sk-class-ada-lovelace-47f9a7
  INSTRUCTOR_CODE = GMJL
  STUDENT_NAME    = RetestPupil

=== RULE 1: REAL CHROME ONLY ===
Every browser step runs in this PC's real Chrome - the one a student
double-clicks. Do NOT use an in-app, embedded, or preview browser for anything
touching https://ai.tail5091fc.ts.net; those return ERR_BLOCKED_BY_CLIENT no
matter how correct the app is. If you have the Claude-in-Chrome tools they drive
real Chrome and are fine. Otherwise launch Chrome yourself and have the person
at the PC read results back. Say which you did.

=== RULE 2: CONFIRM YOU ARE ON THE FIXED BUILD ===
Before anything else, open https://utgapps.github.io/classroom/ in real Chrome.
In DevTools Console run:
    [...document.scripts].map(s=>s.src).find(s=>/index-/.test(s))
It MUST end in  index-Ciy-penN.js . If it shows an older name, the page is
cached: in DevTools > Application > Storage press "Clear site data", then
reload, and check again. Do not proceed until you see index-Ciy-penN.js.

=== RULE 3: REPORTING ===
Exact numbers, exact status codes, exact error text. If something is
inconclusive, say "unproven" - do not guess.

------------------------------------------------------------------------
FIX 1 - the chat actually works now  (this is also the API-from-a-student
         answer we still need)
------------------------------------------------------------------------
The bug: the preview iframe was sandbox="allow-scripts", which made Chrome
silently swallow the chat form's submit - Send and Enter did nothing, no error.
It is now sandbox="allow-scripts allow-forms". Confirm the whole path works end
to end, from typing to a reply on screen.

1. Wake the gateway first so timing is clean:
   curl -s -m 240 -H "Authorization: Bearer CLASS_KEY" -H "content-type: application/json" -d "{\"model\":\"fast\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_tokens\":5}" https://ai.tail5091fc.ts.net/v1/chat/completions
   Retry up to 4 times, 60 s apart, until you get HTTP 200 (it sleeps when idle).

2. In real Chrome: utgapps.github.io -> enter STUDENT_CODE at the gate ->
   "My Classwork" -> join as STUDENT_NAME / STUDENT_CODE.
3. New project -> HTML / CSS / JavaScript.
4. Open https://utgapps.github.io/ai101/week-15.html in another tab. Copy each
   of the three files into the matching file in your project (create style.css
   and script.js first - a new project starts with only index.html, by design).
   Replace sk-class-put-your-own-key-here with CLASS_KEY in script.js.
5. Before pressing Run, in DevTools inspect the preview iframe once it exists
   and report its sandbox attribute. It MUST read "allow-scripts allow-forms".
6. Press Run. Type "Hello, who are you?" in the chat box and press Send.
   Report ALL of:
   - Did your message appear as a bubble? (Before the fix it did not.)
   - Did a reply appear? Quote the first ~15 words.
   - Did it stream in gradually, or arrive all at once?
   - Seconds from Send to the first word.
7. Now press Enter instead of clicking Send, on a second message. Does that
   also send? (Both routes go through the same form submit.)
8. Check the console panel under the preview. Report any red error lines. There
   should be none for a normal exchange.

If step 6 produces a reply on screen, that confirms a student PC can reach the
AI through the real lesson - the thing the previous run could not verify because
Send was broken. That is the single most important result; report it first.

------------------------------------------------------------------------
FIX 2 - a teacher can get in on a shared PC
------------------------------------------------------------------------
The bug: if a pupil had signed in on this PC, opening the instructor link
bounced the teacher to the student join screen. Reproduce the shared-PC state,
then confirm the teacher gets through.

1. You are already signed in as RetestPupil from FIX 1 - good, that is the
   stale student session. Do NOT sign out.
2. In the same Chrome, go to https://utgapps.github.io/classroom/?instructor=1
3. Report what you land on. It MUST be the instructor entry ("Open a curriculum
   classroom", with a field for a four-character instructor code) - NOT the
   student "Open your project" / "Join with a class code" screen.
4. Enter INSTRUCTOR_CODE and open the classroom. Confirm you reach
   "AI101 - Talk to the Machine" / "Instructor access verified" and that the
   right-hand panel shows 15 week chips.

------------------------------------------------------------------------
CLOSE THE TWO GAPS the last run left (needs a human at the keyboard)
------------------------------------------------------------------------
A. Fullscreen keys. In the instructor classroom, open week 4 -> Present slides.
   With a real hand on the keyboard: does Right arrow advance? Does "f" go
   full screen? Does Escape leave full screen and then close the deck? (The last
   run could not test this - synthetic keypresses carry no user activation.)
B. Student login + password reset, for real:
   - In the classroom, "+ Add a student to this class": name "Retest Login",
     accept the suggested username and password, WRITE THEM DOWN.
   - Open a private/incognito window at https://utgapps.github.io/classroom/,
     tab "I have an account", and sign in with that username + password.
     Does it work?
   - Back in the instructor tab, pick that student, press the password reset,
     WRITE DOWN the new password, press "Set this password".
   - In the private window, sign in again: the OLD password must now fail and
     the NEW one must work. Report both.

------------------------------------------------------------------------
REPORT
------------------------------------------------------------------------
  - Which browser, and whether you drove it or a person did.
  - FIX 1: the reply text and first-token seconds, plus each sub-answer in
    step 6, and the sandbox string from step 5.
  - FIX 2: what screen ?instructor=1 landed on, and whether GMJL got you in.
  - GAP A: arrow / f / Escape, each pass or fail.
  - GAP B: the four login results (add, first sign-in, old fails, new works).
  - FINAL VERDICT: can a student sit at this PC and hold a real AI conversation
    in week 15 today? Yes or no. If no, the single thing stopping them.
  - Anything still unproven, and why.

Do not summarise away a failure. If one step blocks the next, report everything
up to that point.
```

---

## Afterwards — remove the test accounts

```
cd "C:\School Software\utgapps.github.io\classroom-worker"
npx wrangler d1 execute utg-classroom --remote --command "DELETE FROM projects WHERE account_id IN (SELECT id FROM accounts WHERE name IN ('RetestPupil','Retest Login')); DELETE FROM accounts WHERE name IN ('RetestPupil','Retest Login')"
```

## What each part proves

- **FIX 1** is both the Send fix and the answer to "can a student PC reach the
  API through the real lesson" — the one path no run has completed, because Send
  was broken every prior time. A reply on screen closes it.
- **FIX 2** is the shared-PC teacher entry, verified against the exact state that
  broke it (a pupil's session still in localStorage).
- **GAPS A and B** are the two things automated input cannot do — fullscreen
  needs a real keypress, and I do not type passwords into login forms.
