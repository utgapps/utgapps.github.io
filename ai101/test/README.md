# Milestone tests

Proves each week's code **works**, not just that it parses. Every milestone is
loaded into a real DOM with a fake gateway standing in for the school server,
then driven the way a student would drive it: type a message, press Send, read
what came back.

```bash
cd ai101/test
npm install
python dump_milestones.py     # replay the 15 milestones out of course.py
node run.mjs                  # run them
node mutate.mjs               # prove the checks would notice a break
```

## Why the fake gateway

The real server needs the school network, a valid key and a GPU, and it answers
differently every time. None of that suits a test. The fake one answers in the
same shapes the real one does - OpenAI-style JSON, or an SSE stream when the
request asks for one - and records every call, so a check can look at what was
actually sent rather than guessing from what appeared on screen.

That distinction matters. "The reply showed up" would pass even if the code sent
only half the conversation. So week 7 inspects the request and asserts the roles
are `system, user, assistant, user` in that order.

## Why mutate.mjs exists

A suite that has only ever been green is not evidence. `mutate.mjs` breaks one
real line at a time - deletes the `history.push` for the assistant's reply,
strips `stream: true`, removes the `res.ok` check - and fails if the suite does
not go red. Ten breakages, all currently caught.

Run it after any change to `course.py`. If a mutation stops being caught, a
check has quietly stopped testing anything.

## What these tests do NOT cover

- The real gateway. Shapes are matched by hand from `gateway/app/main.py`; if
  the server changes its response format these tests will not notice.
- CSS. Nothing here looks at whether the page is laid out correctly.
- The classroom editor itself - the milestones are assembled here the same way
  `lib/preview.ts` assembles them, which is a deliberate duplication.
- Whether a 13-year-old can follow the lesson. No test can tell you that.
