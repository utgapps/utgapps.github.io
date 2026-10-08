// Checking a Python Coding Challenge.
//
// Cheapest first. The student's game is RUN for a few seconds, in the same
// engine and frame as the editor's preview, and anything it reports as an
// error fails the submission on the spot: an error is a fact, and asking a
// language model whether code that just crashed is "error free" would be
// paying for a guess at something already known. Only a game that runs is
// read by the classroom AI's `grader` - Qwen3.8 Flash-Next on the PX13, which
// graded 85 of 86 benchmark hand-ins right - against the challenge's own
// requirements list, the same list the challenge page shows the student.
//
// The model is never asked "does this pass?". Asked that, the school's smart
// model failed every one of the nine working examples, with confident notes
// about code that was plainly there. Asked instead to FIND the lines that
// meet each requirement, it does far better, and the verdict becomes ours to
// work out: a requirement is met when the model names code for it AND that
// code really is in the project - on an empty project it invented plausible
// lines for most requirements, so the quote is checked, not trusted. A
// requirement still unmet gets a second look on its own, which is where the
// "must NOT happen" requirements (no jumping in mid-air) stopped being
// misread. Measured against the examples and broken copies of them: no
// working game failed and nothing half built passed, but a single missing
// line in an otherwise finished game can still slip through.
//
// The verdict is worked out here, in the student's browser, but every question
// goes through the classroom worker, which adds the instructions and the
// grader's key (see checkerPrompts.ts). It used to go straight from the
// browser to the gateway, which is on the school's Tailscale network - so a
// student at home, or on any computer off that network, could not hand in.

import { roomFor, type CheckerStep } from "./checkerPrompts";
import { isBookkeeping, MANIFEST_FILE } from "./game-project";
import type { Challenge } from "./challenges";

/** Asks the grader one checker question and resolves with its reply. The page
 *  sends it through the worker; the benchmark can send it anywhere. */
export type CheckerAsk = (step: CheckerStep, prompt: string) => Promise<string>;

export type Verdict = { passed: boolean; notes: string[] };

/** One line of Python with its comment cut off, minding # inside strings. */
function withoutComment(line: string): string {
  let quote = "";
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (quote) {
      if (character === "\\") index++;
      else if (character === quote) quote = "";
    } else if (character === "'" || character === '"') quote = character;
    else if (character === "#") return line.slice(0, index);
  }
  return line;
}

/** A file as small as it can be without changing what it does: comments and
 *  blank lines gone, and each level of indentation two spaces wide. */
function compact(text: string): string {
  const lines = text.replace(/\t/g, "    ").split(/\r?\n/).map((line) => withoutComment(line).trimEnd()).filter((line) => line.trim());
  const widths = lines.map((line) => line.length - line.trimStart().length).filter((width) => width > 0);
  const unit = widths.length ? Math.min(...widths) : 1;
  return lines.map((line) => {
    const width = line.length - line.trimStart().length;
    return "  ".repeat(Math.round(width / unit)) + line.trimStart();
  }).join("\n");
}

function serialize(files: Record<string, string>): string {
  return Object.keys(files)
    .filter((path) => path === MANIFEST_FILE || (!isBookkeeping(path) && path.endsWith(".py")))
    .sort()
    .map((path) => [path, compact(files[path] || "")])
    .filter(([, text]) => text)
    .map(([path, text]) => `## ${path}\n${text}`)
    .join("\n");
}

/** Code with everything that does not change its meaning taken out, so a quote
 *  can be looked for whatever its spacing. */
const squeeze = (text: string) => text.split(/\r?\n/).map(withoutComment).join("").replace(/\s+/g, "");

/** True when every line the model quoted is somewhere in the project. A line
 *  of just "..." is the model skipping lines it did not need, not code: a
 *  correct game was failed for one, quoted from the top of its loop to the
 *  bottom with the middle left out. */
function quotedFrom(project: string, quote: unknown): boolean {
  const lines = String(quote || "").split(/\r?\n/).map(squeeze).filter((line) => line && !/^(\.\.\.|…)$/.test(line));
  return lines.length > 0 && lines.every((line) => project.includes(line));
}

/** The JSON object in a reply. A model asked for only JSON still sometimes
 *  wraps it in a fence or a sentence, so this looks for the object. */
function jsonIn(reply: string): Record<string, unknown> | null {
  const start = reply.indexOf("{"), end = reply.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try { return JSON.parse(reply.slice(start, end + 1)); } catch { return null; }
}

/** The errors a game reported while it ran, as a failed verdict - or null when
 *  it ran clean. Repeats are dropped: a loop that fails fails every frame. */
export function errorVerdict(errors: string[]): Verdict | null {
  const distinct = [...new Set(errors.map((text) => text.trim()).filter(Boolean))].slice(0, 5);
  if (!distinct.length) return null;
  return {
    passed: false,
    notes: [
      ...distinct.map((text) => "When your game ran, it said: " + text),
      "Fix the error first - press PLAY in your project and watch the console - then hand it in again.",
    ],
  };
}

const UNREADABLE = "The checker gave an answer that could not be read. Nothing was counted - press Submit again.";

/* How long any one step of a hand-in may go without an answer before the
   student gets the Submit button back. A whole check can take longer than
   this - it is one request plus a second look at each missing requirement -
   but every one of those answers must arrive within it.

   Two minutes, not one, since grading moved to the PX13: a check there takes
   about 15 s and two run at once, so ten students handing in together leave
   the last one waiting about 75 s for a FIRST answer - past a minute with
   nothing wrong. */
export const NO_ANSWER_MS = 120000;
export const NO_ANSWER = "No answer came back for two minutes. Nothing was counted - press Submit again.";

/** `onAsk` hears what the checker is about to wait for, just before each
 *  request - each of which gets its own NO_ANSWER_MS - so the page can show
 *  the student the step and the time left on it. */
export async function askChecker(ask: CheckerAsk, challenge: Challenge, files: Record<string, string>,
  onAsk: (doing: string) => void = () => {}): Promise<Verdict> {
  const code = serialize(files);
  if (!code.replace(/^## .*$/gm, "").trim()) {
    return { passed: false, notes: ["Your project has no code in it yet. Open it, build the mechanic, then hand it in again."] };
  }
  const requirements = challenge.requirements;
  const findPrompt = "REQUIREMENTS:\n" + requirements.map((line, index) => `${index + 1}. ${line}`).join("\n") + "\nPROJECT:\n" + code;
  const room = roomFor("find") - (findPrompt.length - code.length);
  if (code.length > room) {
    // Not a failed attempt - the checker never read it, so nothing is counted.
    throw new Error(`Your game is too long for the checker to read: ${code.length} characters of code, and it has room for ${room}. ` +
      "Hand in a project that only builds this challenge - take out other experiments and unused files - then submit again.");
  }
  const project = squeeze(Object.values(files).join("\n"));
  onAsk("Reading your code against every line of the challenge");
  const found = jsonIn(await ask("find", findPrompt));
  if (!found || !Array.isArray(found.requirements)) throw new Error(UNREADABLE);
  const answers = found.requirements as { n?: unknown; code?: unknown; met?: unknown; why?: unknown }[];
  const unmet: { number: number; why: string }[] = [];
  requirements.forEach((_, index) => {
    const answer = answers.find((entry) => Number(entry.n) === index + 1);
    if (!answer || answer.met !== true || !quotedFrom(project, answer.code)) unmet.push({ number: index + 1, why: String(answer?.why || "") });
  });

  // A second look, one requirement at a time - but only at a game that is
  // mostly there. Half the list missing is not a misreading.
  const missing = unmet.length * 2 <= requirements.length
    ? await unmet.reduce<Promise<typeof unmet>>(async (sofar, item, index) => {
        const still = await sofar;
        onAsk(`Taking a second look at requirement ${item.number} (${index + 1} of ${unmet.length})`);
        const again = jsonIn(await ask("look", `REQUIREMENT: ${requirements[item.number - 1]}\nPROJECT:\n${code}`));
        if (!(again && again.met === true && quotedFrom(project, again.code))) still.push({ number: item.number, why: String(again?.why || item.why) });
        return still;
      }, Promise.resolve([]))
    : unmet;

  if (!missing.length) return { passed: true, notes: [] };
  return {
    passed: false,
    notes: missing.slice(0, 6).map(({ number, why }) =>
      why.trim() ? why.trim() : `Your game does not do this yet: ${requirements[number - 1]}`),
  };
}
