/* Running compiled Java: steps the program's generator, which pauses whenever
   the program waits for the keyboard or sleeps. The worker drives it in the
   browser; the tests drive the same code in node. */
import { ExitSignal, JThrowable, createRuntime, type JavaRuntime, type RuntimeHost, type WaitRequest } from "./runtime";

export type Step =
  | { state: "input" }
  | { state: "sleep"; ms: number }
  | { state: "exit"; status: number };

export class JavaSession {
  readonly runtime: JavaRuntime;
  private program: Generator<WaitRequest, void, unknown> | null = null;
  private finished: Step | null = null;

  constructor(code: string, private host: RuntimeHost) {
    this.runtime = createRuntime(host);
    try {
      const makeMain = new Function("$rt", code) as (runtime: JavaRuntime) => () => Generator<WaitRequest, void, unknown>;
      this.program = makeMain(this.runtime)();
    } catch (error) {
      this.finished = this.crash(error);
    }
  }

  feed(text: string) { this.runtime.feed(text); }
  endInput() { this.runtime.endInput(); }

  /** Run until the program waits or ends. Call again after feeding input, or after the sleep. */
  step(): Step {
    if (this.finished) return this.finished;
    try {
      const next = this.program!.next();
      if (next.done) return (this.finished = { state: "exit", status: 0 });
      return next.value.wait === "input" ? { state: "input" } : { state: "sleep", ms: next.value.ms };
    } catch (error) {
      return (this.finished = this.crash(error));
    }
  }

  private crash(error: unknown): Step {
    if (error instanceof ExitSignal) return { state: "exit", status: error.status };
    let thrown: unknown = error;
    // A frame-less error (a stack overflow in the runtime itself) still becomes Java's.
    if (!(thrown instanceof JThrowable)) {
      try { thrown = this.runtime.jex(error); } catch { /* not Java's: reported below */ }
    }
    if (thrown instanceof JThrowable) {
      this.host.write("err", this.runtime.uncaughtText(thrown));
      return { state: "exit", status: 1 };
    }
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    this.host.write("err", `The classroom Java runner hit a problem of its own, not in your code:\n  ${detail}\n`);
    return { state: "exit", status: 1 };
  }
}
